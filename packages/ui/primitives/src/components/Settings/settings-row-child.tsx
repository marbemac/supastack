import {
  type SettingsRowChildProps as BSettingsRowChildProps,
  settingsRowChildStaticClass,
  settingsRowChildStyle,
  splitPropsVariants,
} from '@supastack/ui-styles';
import { useMemo, useState } from 'react';

import { Box } from '../Box/index.ts';
import { Icon } from '../Icon/index.ts';
import { SelectRoot, SelectTrigger } from '../Select/index.ts';

export type SettingsRowChildProps = BSettingsRowChildProps<React.ReactNode>;

export function SettingsRowChild(props: SettingsRowChildProps) {
  const [open, setOpen] = useState(false);

  const [, variantProps] = splitPropsVariants(props, settingsRowChildStyle.variantKeys);

  const slots = useMemo(
    () => settingsRowChildStyle(variantProps),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(variantProps)],
  );

  const baseTw = slots.base({ class: settingsRowChildStaticClass('base') });
  const contentTw = slots.content({ class: settingsRowChildStaticClass('content') });
  const endIconTw = slots.endIcon({ class: settingsRowChildStaticClass('endIcon') });

  let onPress;
  let endElem;

  switch (props.type) {
    case 'select':
      onPress = () => setOpen(true);

      endElem = (
        <SelectRoot
          size="sm"
          open={open}
          onOpenChange={setOpen}
          value={props.value}
          onValueChange={props.onValueChange}
          disabled={variantProps.isDisabled}
        >
          <SelectTrigger variant="outline" />
          {props.renderSelectContent()}
        </SelectRoot>
      );

      break;

    case 'action':
      onPress = props.onPress;

      endElem = (
        <Box tw={endIconTw}>
          <Icon icon={['far', 'chevron-right']} />
        </Box>
      );

      break;
  }

  return (
    <Box tw={baseTw} onClick={!props.isDisabled ? onPress : undefined}>
      <Box tw={contentTw}>{props.children}</Box>

      {endElem}
    </Box>
  );
}
