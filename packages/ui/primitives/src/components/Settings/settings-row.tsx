import { useClipboard } from '../../hooks/use-clipboard.ts';
import { Box } from '../Box/index.ts';
import { Button } from '../Button/index.ts';
import { Icon, type IconProps } from '../Icon/index.ts';
import { HStack, VStack } from '../Stack/index.ts';

type SettingsRowIcon = {
  icon: IconProps['icon'];
};

type CommonSettingsRowProps = {
  label: string;
  hint?: string | React.ReactNode;
  icon?: SettingsRowIcon;
  isDisabled?: boolean;
};

type SwitchSettingsRowProps = CommonSettingsRowProps & {
  type: 'switch';
  onClick: (isSelected: boolean) => unknown;
  isSelected: boolean;
  switchLabel: string;
};

type DialogSettingsRowProps = CommonSettingsRowProps & {
  type: 'dialog';
  onClick: () => unknown;
  value?: string | React.ReactNode;
};

type ListSettingsRowProps = CommonSettingsRowProps & {
  type: 'list';
  onClick: () => unknown;
  noAction?: boolean;
  actionText?: string;
  items: SettingsRowChildItemProps[];
  isLoadingItems?: boolean;
};

type ExternalLinkSettingsRowProps = CommonSettingsRowProps & {
  type: 'external-link';
  onClick: () => unknown;
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
  | ExternalLinkSettingsRowProps
  | CopySettingsRowProps;

export const SettingsRow = (props: SettingsRowProps) => {
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
      return <_SettingsRow {...props} hasMoreIcon="chevron-right" valueElem={<Box>{props.value}</Box>} />;

    case 'external-link':
      return <_SettingsRow {...props} />;

    case 'copy':
      return <CopySettingsRow {...props} />;

    case 'list':
      return (
        <_SettingsRow
          {...props}
          onClick={props.noAction ? undefined : props.onClick}
          actionElem={
            !props.noAction ? (
              <Button size="sm" isDisabled={props.isDisabled} onClick={props.onClick}>
                {props.actionText ?? 'Add'}
              </Button>
            ) : undefined
          }
        >
          {props.items?.length ? (
            <Box tw="pl-14">
              <Box tw="h-px bg-neutral-soft-1-a" />
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
  onClick?: () => void;
};

const _SettingsRow = ({
  label,
  hint,
  icon,
  children,
  onClick,
  isDisabled,
  hasMoreIcon,
  valueElem,
  actionElem,
}: InternalSettingsRowProps) => {
  const canInteract = !!onClick && !isDisabled;

  return (
    <Box>
      <Box
        tw={[
          'flex items-center py-3.5 pl-1.5 pr-3',
          canInteract ? 'cursor-pointer hover:bg-neutral-soft-1-a' : 'cursor-auto',
        ]}
        onClick={() => {
          !isDisabled && onClick && onClick();
        }}
      >
        {icon && (
          <Box tw="-ml-6 w-20 text-center text-xl text-muted">
            <Icon icon={icon.icon} />
          </Box>
        )}

        <Box tw="flex flex-1 items-center">
          <Box tw="flex-1">
            <Labels label={label} hint={hint} />
          </Box>

          <HStack spacing={3}>
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

type SettingsRowChildItemProps = {
  children: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
};

function SettingsRowChildItem({ children, onClick, isDisabled }: SettingsRowChildItemProps) {
  return (
    <Box
      tw={[
        'flex items-center py-3 pl-1.5 pr-3',
        !isDisabled && 'cursor-pointer hover:bg-neutral-soft-1-a',
        isDisabled && 'cursor-auto',
      ]}
      onClick={!isDisabled ? onClick : undefined}
    >
      <Box tw="flex flex-1 items-center">{children}</Box>

      <Box tw="text-muted">
        <Icon icon="chevron-right" />
      </Box>
    </Box>
  );
}

type LabelsProps = {
  label: string;
  hint?: string | React.ReactNode;
};

function Labels({ label, hint }: LabelsProps) {
  return (
    <VStack spacing={1}>
      <Box tw="text-lg font-medium">{label}</Box>

      {hint && <Box tw="text-muted">{hint}</Box>}
    </VStack>
  );
}

const CopySettingsRow = ({ value, ...props }: CopySettingsRowProps) => {
  const { copy, hasCopied } = useClipboard(value);

  return (
    <_SettingsRow
      {...props}
      hasMoreIcon={['fal', hasCopied ? 'check' : 'copy']}
      valueElem={<Box>{value}</Box>}
      onClick={copy}
    />
  );
};
