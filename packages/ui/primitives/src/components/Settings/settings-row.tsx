import {
  type SettingsRowProps as BSettingsRowProps,
  settingsRowStaticClass,
  settingsRowStyle,
  splitPropsVariants,
} from '@supastack/ui-styles';
import { useCallback, useMemo, useState } from 'react';

import { useClipboard } from '../../hooks/use-clipboard.ts';
import { Box } from '../Box/index.ts';
import { Button } from '../Button/index.ts';
import { Dialog, DialogContent, DialogTitle } from '../Dialog/index.ts';
import { Heading } from '../Heading/index.ts';
import { Icon, type IconProps } from '../Icon/index.ts';
import { SelectRoot, SelectTrigger } from '../Select/index.ts';
import { HStack, VStack } from '../Stack/index.ts';
import { Text } from '../Text/index.ts';
import { SettingsRowChild } from './settings-row-child.tsx';

export type SettingsRowProps = BSettingsRowProps<React.ReactNode>;

export const SettingsRow = (props: SettingsRowProps) => {
  const [open, onOpenChange] = useState(false);

  const [, variantProps] = splitPropsVariants(props, settingsRowStyle.variantKeys);

  const slots = useMemo(
    () => settingsRowStyle(variantProps),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(variantProps)],
  );

  switch (props.type) {
    // @TODO implement switch settings row
    case 'switch':
      return <div>@TODO</div>;
    // return (
    //   <_SettingsRow
    //     {...props}
    //     actionElem={
    //       <Switch isSelected={props.isSelected} isDisabled={props.isDisabled} aria-label={props.switchLabel} />
    //     }
    //     onClick={() => {
    //       props.onClick(!props.isSelected);
    //     }}
    //   />
    // );

    case 'dialog':
      return (
        <_SettingsRow
          {...props}
          slots={slots}
          hasMoreIcon={['far', 'chevron-right']}
          valueElem={<Box>{props.value}</Box>}
          onPress={() => onOpenChange(true)}
        >
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
              tw={slots.dialogContent({
                class: [settingsRowStaticClass('dialogContent'), props.slotClasses?.dialogContent],
              })}
            >
              <VStack divider spacing={5}>
                <DialogTitle>{props.label}</DialogTitle>

                {props.children}
              </VStack>
            </DialogContent>
          </Dialog>
        </_SettingsRow>
      );

    case 'select':
      return (
        <_SettingsRow
          {...props}
          slots={slots}
          onPress={() => onOpenChange(true)}
          isActionElemTabbable
          actionElem={
            <SelectRoot
              size="sm"
              open={open}
              onOpenChange={onOpenChange}
              value={props.value}
              onValueChange={props.onValueChange}
              disabled={props.isDisabled}
            >
              <SelectTrigger variant="outline" />
              {props.renderSelectContent()}
            </SelectRoot>
          }
        />
      );

    case 'action':
      return <_SettingsRow {...props} slots={slots} />;

    case 'copy':
      return <CopySettingsRow {...props} slots={slots} />;

    case 'list':
      return (
        <_SettingsRow
          {...props}
          slots={slots}
          onPress={props.noAction ? undefined : props.onPress}
          actionElem={
            !props.noAction ? (
              <Button size="sm" isDisabled={props.isDisabled} onClick={props.onPress}>
                {props.actionText ?? 'Add'}
              </Button>
            ) : undefined
          }
        >
          {props.items?.length ? (
            <Box
              tw={slots.listContainer({
                class: [settingsRowStaticClass('listContainer'), props.slotClasses?.listContainer],
              })}
            >
              <Box
                tw={slots.listDivider({
                  class: [settingsRowStaticClass('listDivider'), props.slotClasses?.listDivider],
                })}
              />
              <VStack divider>
                {props.items.map((i, k) => (
                  <SettingsRowChild key={k} {...i} />
                ))}
              </VStack>
            </Box>
          ) : null}
        </_SettingsRow>
      );
  }
};

type InternalSettingsRowProps = Omit<SettingsRowProps, 'type' | 'onClick'> & {
  slots: ReturnType<typeof settingsRowStyle>;
  hasMoreIcon?: IconProps['icon'];
  valueElem?: React.ReactNode;
  actionElem?: React.ReactNode;
  isActionElemTabbable?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
};

const _SettingsRow = ({
  tw,
  UNSAFE_class,
  slots,
  slotClasses,
  label,
  hint,
  icon,
  children,
  onPress,
  isDisabled,
  hasMoreIcon,
  valueElem,
  actionElem,
  isActionElemTabbable,
}: InternalSettingsRowProps) => {
  const canInteract = !!onPress && !isDisabled;
  const isRowTabbable = canInteract && !isActionElemTabbable;

  const baseTw = slots.base({ class: [settingsRowStaticClass('base'), tw, UNSAFE_class] });
  const containerTw = slots.container({
    canInteract,
    class: [settingsRowStaticClass('container'), slotClasses?.container],
  });
  const startIconTw = slots.startIcon({ class: [settingsRowStaticClass('startIcon'), slotClasses?.startIcon] });
  const contentTw = slots.content({ class: [settingsRowStaticClass('content'), slotClasses?.content] });
  const endIconTw = slots.endIcon({ class: [settingsRowStaticClass('endIcon'), slotClasses?.endIcon] });

  const handlePress = useCallback(() => {
    !isDisabled && onPress && onPress();
  }, [isDisabled, onPress]);

  const handleKeyUp = useCallback(
    (evt: React.KeyboardEvent) => {
      if ([' ', 'Enter'].includes(evt.key)) {
        handlePress();
      }
    },
    [handlePress],
  );

  return (
    <Box tw={baseTw}>
      <Box
        tabIndex={isRowTabbable ? 0 : undefined}
        tw={containerTw}
        onClick={handlePress}
        onKeyUp={isRowTabbable ? handleKeyUp : undefined}
      >
        {icon && (
          <Box tw={startIconTw}>
            <Icon icon={icon} fw />
          </Box>
        )}

        <Box tw={contentTw}>
          <Labels slots={slots} slotClasses={slotClasses} label={label} hint={hint} />

          <HStack spacing={3} center="y">
            {valueElem}

            {actionElem}

            {hasMoreIcon && (
              <Box tw={endIconTw}>
                <Icon icon={hasMoreIcon} />
              </Box>
            )}
          </HStack>
        </Box>
      </Box>

      {children}
    </Box>
  );
};

type LabelsProps = Pick<InternalSettingsRowProps, 'slots' | 'slotClasses' | 'label' | 'hint'>;

function Labels({ slots, slotClasses, label, hint }: LabelsProps) {
  const labelTw = slots.label({ class: [settingsRowStaticClass('label'), slotClasses?.label] });
  const hintTw = slots.hint({ class: [settingsRowStaticClass('hint'), slotClasses?.hint] });

  return (
    <VStack spacing={3} tw={labelTw}>
      <Heading size={2} as="h4" trim="both">
        {label}
      </Heading>

      {hint && (
        <Text tw={hintTw} trim="both">
          {hint}
        </Text>
      )}
    </VStack>
  );
}

const CopySettingsRow = ({
  value,
  ...props
}: Extract<SettingsRowProps, { type: 'copy' }> & { slots: ReturnType<typeof settingsRowStyle> }) => {
  const { copy, hasCopied } = useClipboard(value);

  return (
    <_SettingsRow
      {...props}
      hasMoreIcon={['far', hasCopied ? 'check' : 'copy']}
      valueElem={<Box>{value}</Box>}
      onPress={copy}
    />
  );
};
