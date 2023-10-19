import type { Meta } from '@storybook/react';

import { Icon } from '../Icon/index.ts';
import { HStack, VStack } from '../Stack/index.ts';
import { Avatar } from './avatar.tsx';

const meta = {
  title: 'Components / Avatar',
  component: Avatar,
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta<typeof Avatar>;

export default meta;

const avatarUrl = 'https://bit.ly/dan-abramov';

export const Basic = {
  render: () => (
    <VStack spacing={4}>
      <Avatar src={avatarUrl} fallback="S" />

      <Avatar fallback="S" />
    </VStack>
  ),
};

export const Sizes = {
  render: () => {
    return (
      <VStack spacing={8}>
        <HStack spacing={4}>
          <Avatar src={avatarUrl} fallback="John" size="2xl" />
          <Avatar src={avatarUrl} fallback="John" size="xl" />
          <Avatar src={avatarUrl} fallback="John" size="lg" />
          <Avatar src={avatarUrl} fallback="John" size="md" />
          <Avatar src={avatarUrl} fallback="John" size="sm" />
        </HStack>

        <HStack spacing={3}>
          <Avatar fallback="John" size="2xl" />
          <Avatar fallback="John" size="xl" />
          <Avatar fallback="John" size="lg" />
          <Avatar fallback="John" size="md" />
          <Avatar fallback="John" size="sm" />
        </HStack>

        <HStack spacing={3}>
          <Avatar fallback="John" size="2xl" tw="rounded-full" />
          <Avatar fallback="Sam" size="xl" tw="rounded-full" />
          <Avatar fallback="Marc" size="lg" tw="rounded-full" />
          <Avatar fallback="Jack" size="md" tw="rounded-full" />
          <Avatar fallback="Chris" size="sm" tw="rounded-full" />
        </HStack>
      </VStack>
    );
  },
};

export const Icons = {
  render: () => {
    return (
      <VStack spacing={8}>
        <HStack spacing={3}>
          <Avatar fallback={<Icon icon={['fas', 'user-alt']} />} size="2xl" tw="rounded-full" />
          <Avatar fallback={<Icon icon={['fas', 'rocket-launch']} />} size="xl" tw="rounded-full" />
          <Avatar fallback={<Icon icon={['fas', 'cube']} />} size="lg" tw="rounded-full" />
          <Avatar fallback={<Icon icon={['fas', 'plus']} />} size="md" tw="rounded-full" />
          <Avatar fallback={<Icon icon={['fas', 'plus']} />} size="sm" tw="rounded-full" />
        </HStack>
      </VStack>
    );
  },
};

export const Fallback = {
  render: () => {
    return (
      <VStack spacing={8}>
        <HStack spacing={3}>
          <Avatar fallback="Sally" size="2xl" src="https://bit.ly/broken-link" />
        </HStack>
      </VStack>
    );
  },
};
