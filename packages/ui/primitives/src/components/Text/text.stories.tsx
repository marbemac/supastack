import type { Meta } from '@storybook/react';

import { VStack } from '../Stack/index.ts';
import { Text } from './text.tsx';

const meta = {
  title: 'Components / Text',
  component: Text,
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta<typeof Text>;

export default meta;

export const Sizes = {
  render: () => (
    <VStack spacing={4}>
      <Text size={1} tw="leading-1">
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text size={2}>The quick brown fox jumps over the lazy dog</Text>
      <Text size={3}>The quick brown fox jumps over the lazy dog</Text>
      <Text size={4}>The quick brown fox jumps over the lazy dog</Text>
      <Text size={5}>The quick brown fox jumps over the lazy dog</Text>
      <Text size={6}>The quick brown fox jumps over the lazy dog</Text>
      <Text size={7}>The quick brown fox jumps over the lazy dog</Text>
      <Text size={8}>The quick brown fox jumps over the lazy dog</Text>
      <Text size={9}>The quick brown fox jumps over the lazy dog</Text>
    </VStack>
  ),
};

export const Trim = {
  render: () => (
    <VStack spacing={4} tw="w-96">
      <Text tw="border-y border-dashed bg-neutral-soft">Without trim</Text>

      <Text trim="start" tw="border-y border-dashed bg-neutral-soft">
        With trim (start)
      </Text>

      <Text trim="end" tw="border-y border-dashed bg-neutral-soft">
        With trim (end)
      </Text>

      <Text trim="both" tw="border-y border-dashed bg-neutral-soft">
        With trim (both)
      </Text>

      <Text trim="both" size={8} tw="border-y border-dashed bg-neutral-soft">
        With trim (both)
      </Text>

      <Text trim="both" size={9} tw="border-y border-dashed bg-neutral-soft">
        With trim (both)
      </Text>
    </VStack>
  ),
};
