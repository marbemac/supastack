import type { Meta } from '@storybook/react';

import { Box } from '../Box/index.ts';
import { Text } from '../Text/index.ts';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './tabs.tsx';

const meta = {
  title: 'Components / Tabs',
  component: TabsRoot,
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta<typeof TabsRoot>;

export default meta;

export const Basic = {
  render: () => (
    <TabsRoot defaultValue="account" tw="w-80 rounded border">
      <TabsList tw="shadow-border-b">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <Box tw="h-60 px-4 py-3 pb-2">
        <TabsContent value="account">
          <Text>Make changes to your account.</Text>
        </TabsContent>

        <TabsContent value="documents">
          <Text>Access and update your documents.</Text>
        </TabsContent>

        <TabsContent value="settings">
          <Text>Edit your profile or update contact information.</Text>
        </TabsContent>
      </Box>
    </TabsRoot>
  ),
};
