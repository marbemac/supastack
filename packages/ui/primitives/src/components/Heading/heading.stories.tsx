import type { Meta } from '@storybook/react';

import { VStack } from '../Stack/index.ts';
import { Heading } from './heading.tsx';

const meta = {
  title: 'Components / Heading',
  component: Heading,
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta<typeof Heading>;

export default meta;

export const Sizes = {
  render: () => (
    <VStack spacing={4}>
      <Heading size={1} tw="leading-1">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading size={2}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading size={3}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading size={4}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading size={5}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading size={6}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading size={7}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading size={8}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading size={9}>The quick brown fox jumps over the lazy dog</Heading>
    </VStack>
  ),
};

export const Trim = {
  render: () => (
    <VStack spacing={4} tw="w-96">
      <Heading tw="border-y border-dashed bg-neutral-soft">Without trim</Heading>

      <Heading trim="start" tw="border-y border-dashed bg-neutral-soft">
        With trim (start)
      </Heading>

      <Heading trim="end" tw="border-y border-dashed bg-neutral-soft">
        With trim (end)
      </Heading>

      <Heading trim="both" tw="border-y border-dashed bg-neutral-soft">
        With trim (both)
      </Heading>

      <Heading trim="both" size={8} tw="border-y border-dashed bg-neutral-soft">
        With trim (both)
      </Heading>

      <Heading trim="both" size={9} tw="border-y border-dashed bg-neutral-soft">
        With trim (both)
      </Heading>
    </VStack>
  ),
};
