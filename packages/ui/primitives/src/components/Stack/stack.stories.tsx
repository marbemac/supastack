import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box/index.ts';
import { HStack, Stack, VStack } from './stack.tsx';

const meta = {
  title: 'Components / Stack',
  component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical = {
  render: () => (
    <Stack spacing={4}>
      <Box tw="text-fg">text-fg</Box>
      <Box tw="text-muted">text-muted</Box>
      <Box tw="text-soft">text-fg-soft</Box>
    </Stack>
  ),
} satisfies Story;

export const WithDivider = {
  render: () => (
    <Stack divider tw="w-40 border">
      <Box tw="px-4 py-3">Item</Box>
      <Box tw="px-4 py-3">Item</Box>
      <Box tw="px-4 py-3">Item</Box>
      <Box tw="px-4 py-3">Item</Box>
      <Box tw="px-4 py-3">Item</Box>
    </Stack>
  ),
} satisfies Story;
