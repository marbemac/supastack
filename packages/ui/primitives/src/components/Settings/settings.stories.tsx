import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box/index.ts';
import { HStack, VStack } from '../Stack/index.ts';
import { SettingsRow } from './settings-row.tsx';
import { SettingsSection } from './settings-section.tsx';

const meta = {
  title: 'Components / Settings',
  component: SettingsSection,
} satisfies Meta<typeof SettingsSection>;

export default meta;
type Story = StoryObj<typeof SettingsSection>;

export const KitchenSink: Story = {
  render: args => (
    <>
      <SettingsSection title="Foo">bar</SettingsSection>
    </>
  ),
};
