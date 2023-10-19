import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { Box } from '../Box/index.ts';
import { Text } from '../Text/index.ts';
import { TabMenu, TabMenuTrigger } from './tab-menu.tsx';

const meta = {
  title: 'Components / Tab Menu',
  component: TabMenu,
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta<typeof TabMenu>;

export default meta;

export const Basic = {
  render: () => <MenuExample />,
};

const Link = ({
  active,
  children,
  ...rest
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: (e: any) => void;
}) => {
  return (
    <a {...rest} data-state={active ? 'active' : 'inactive'}>
      {children}
    </a>
  );
};

const MenuExample = () => {
  const [active, updateActive] = useState('accounts');

  return (
    <Box tw="w-80 rounded border">
      <TabMenu tw="shadow-border-b">
        <TabMenuTrigger
          as={Link}
          active={active === 'accounts'}
          onClick={e => {
            e.preventDefault();
            updateActive('accounts');
          }}
        >
          Account
        </TabMenuTrigger>

        <TabMenuTrigger
          as={Link}
          active={active === 'documents'}
          onClick={e => {
            e.preventDefault();
            updateActive('documents');
          }}
        >
          Documents
        </TabMenuTrigger>

        <TabMenuTrigger
          as={Link}
          active={active === 'settings'}
          onClick={e => {
            e.preventDefault();
            updateActive('settings');
          }}
        >
          Settings
        </TabMenuTrigger>
      </TabMenu>

      <Box tw="h-40 px-4 py-3 pb-2">
        <Text>Active tab - {active}</Text>
      </Box>
    </Box>
  );
};
