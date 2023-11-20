import { useCallback, useState } from 'react';

import { useClipboard } from '../../hooks/use-clipboard.ts';
import { Box } from '../Box/index.ts';
import { Button } from '../Button/index.ts';
import { Dialog, DialogContent, DialogTitle } from '../Dialog/index.ts';
import { Heading } from '../Heading/index.ts';
import { Icon, type IconProps } from '../Icon/index.ts';
import type { SelectRootProps } from '../Select/index.ts';
import { SelectRoot, SelectTrigger } from '../Select/index.ts';
import { HStack, VStack } from '../Stack/index.ts';
import { Text } from '../Text/index.ts';

type CommonSettingsRowProps = {
  label: string;
  hint?: string | React.ReactNode;
  icon?: IconProps['icon'];
  isDisabled?: boolean;
};

type SwitchSettingsRowProps = CommonSettingsRowProps & {
  type: 'switch';
  onPress: (isSelected: boolean) => unknown;
  isSelected: boolean;
  switchLabel: string;
};

type DialogSettingsRowProps = CommonSettingsRowProps & {
  type: 'dialog';
  // The contents to put in the Dialog
  children: React.ReactNode;
  value?: string | React.ReactNode;
};

type ListSettingsRowProps = CommonSettingsRowProps & {
  type: 'list';
  onPress?: () => unknown;
  noAction?: boolean;
  actionText?: string;
  items: SettingsRowChildItemProps[];
  isLoadingItems?: boolean;
};

type ActionSettingsRowProps = CommonSettingsRowProps & {
  type: 'action';
  onPress: () => unknown;
  hasMoreIcon?: IconProps['icon'];
  value?: string;
};

type CopySettingsRowProps = CommonSettingsRowProps & {
  type: 'copy';
  value: string;
};

export type SettingsRowProps =
  | SwitchSettingsRowProps
  | DialogSettingsRowProps
  | ListSettingsRowProps
  | ActionSettingsRowProps
  | CopySettingsRowProps;

export const SettingsRow = (props: SettingsRowProps) => {
  const [open, onOpenChange] = useState(false);

  switch (props.type) {
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
          hasMoreIcon={['far', 'chevron-right']}
          valueElem={<Box>{props.value}</Box>}
          onPress={() => onOpenChange(true)}
        >
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent tw="w-full">
              <VStack divider spacing={5}>
                <DialogTitle>{props.label}</DialogTitle>

                {props.children}
              </VStack>
            </DialogContent>
          </Dialog>
        </_SettingsRow>
      );

    case 'action':
      return <_SettingsRow {...props} />;

    case 'copy':
      return <CopySettingsRow {...props} />;

    case 'list':
      return (
        <_SettingsRow
          {...props}
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
            <Box tw="pl-14">
              <Box tw="h-px border-neutral-line-1/60" />
              <VStack divider>
                {props.items.map((i, k) => (
                  <SettingsRowChildItem key={k} {...i} />
                ))}
              </VStack>
            </Box>
          ) : null}
        </_SettingsRow>
      );
  }
};

type InternalSettingsRowProps = Omit<SettingsRowProps, 'type' | 'onClick'> & {
  hasMoreIcon?: IconProps['icon'];
  valueElem?: React.ReactNode;
  actionElem?: React.ReactNode;
  children?: React.ReactNode;
  onPress?: () => void;
};

const _SettingsRow = ({
  label,
  hint,
  icon,
  children,
  onPress,
  isDisabled,
  hasMoreIcon,
  valueElem,
  actionElem,
}: InternalSettingsRowProps) => {
  const canInteract = !!onPress && !isDisabled;

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
    <Box>
      <Box
        tabIndex={canInteract ? 0 : undefined}
        tw={[
          'flex items-center py-5 pl-1.5 pr-3',
          canInteract ? 'cursor-pointer hover:bg-neutral-soft-1/50' : 'cursor-auto',
        ]}
        onClick={handlePress}
        onKeyUp={handleKeyUp}
      >
        {icon && (
          <Box tw="w-14 text-4xl text-muted">
            <Icon icon={icon} fw />
          </Box>
        )}

        <Box tw="flex flex-1 items-center">
          <Box tw="flex-1">
            <Labels label={label} hint={hint} />
          </Box>

          <HStack spacing={3} center="y">
            {valueElem}

            {actionElem}

            {hasMoreIcon && (
              <Box tw="text-muted">
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

type CommonSettingsRowChildItemProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
};

type SelectChildSettingsRowProps = CommonSettingsRowChildItemProps &
  Pick<SelectRootProps, 'value' | 'onValueChange'> & {
    type: 'select';
    renderSelectContent: () => React.ReactNode;
  };

type ActionChildSettingsRowProps = CommonSettingsRowChildItemProps & {
  type: 'action';
  onPress: () => void;
};

type SettingsRowChildItemProps = SelectChildSettingsRowProps | ActionChildSettingsRowProps;

function SettingsRowChildItem({ children, isDisabled, ...props }: SettingsRowChildItemProps) {
  const [open, setOpen] = useState(false);

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
          disabled={isDisabled}
        >
          <SelectTrigger variant="outline" />
          {props.renderSelectContent()}
        </SelectRoot>
      );

      break;

    case 'action':
      onPress = props.onPress;

      endElem = (
        <Box tw="text-muted">
          <Icon icon={['far', 'chevron-right']} />
        </Box>
      );

      break;
  }

  return (
    <Box
      tw={[
        'flex items-center py-3.5 pl-1.5 pr-3',
        !isDisabled && 'cursor-pointer hover:bg-neutral-soft-1/50',
        isDisabled && 'cursor-auto',
      ]}
      onClick={!isDisabled ? onPress : undefined}
    >
      <Box tw="flex flex-1 items-center">{children}</Box>

      {endElem}
    </Box>
  );
}

type LabelsProps = {
  label: string;
  hint?: string | React.ReactNode;
};

function Labels({ label, hint }: LabelsProps) {
  return (
    <VStack spacing={3}>
      <Heading size={2} as="h4" trim="both">
        {label}
      </Heading>

      {hint && (
        <Text tw="text-sm text-muted" trim="both">
          {hint}
        </Text>
      )}
    </VStack>
  );
}

const CopySettingsRow = ({ value, ...props }: CopySettingsRowProps) => {
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
