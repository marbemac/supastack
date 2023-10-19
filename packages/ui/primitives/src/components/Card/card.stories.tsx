import type { Meta } from '@storybook/react';

import { Avatar } from '../Avatar/index.ts';
import { Box } from '../Box/index.ts';
import { Button } from '../Button/button.tsx';
import { Heading } from '../Heading/heading.tsx';
import { Input } from '../Input/input.tsx';
import { Label } from '../Label/label.tsx';
import { HStack, VStack } from '../Stack/index.ts';
import { Text } from '../Text/index.ts';
import { Card } from './card.tsx';
import { ThemesPanelBackgroundImage } from './panel-bg-image.tsx';

const meta = {
  title: 'Components / Card',
  component: Card,
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta<typeof Card>;

export default meta;

export const Basic = {
  render: () => (
    <VStack spacing={4}>
      <Card style={{ width: 300 }}>
        <HStack spacing={4} center="y">
          <Avatar src="https://bit.ly/kent-c-dodds" fallback="K" tw="rounded-full" size="lg" />

          <Box>
            <Text as="div" tw="font-bold">
              Kent Dodds
            </Text>
            <Text as="div" tw="text-muted">
              Engineering
            </Text>
          </Box>
        </HStack>
      </Card>
    </VStack>
  ),
};

export const Sizes = {
  render: () => (
    <VStack spacing={4}>
      <Card size="sm" style={{ width: 300 }}>
        <HStack spacing={3} center="y">
          <Avatar src="https://bit.ly/kent-c-dodds" fallback="K" tw="rounded-full" />

          <Box>
            <Text as="div" tw="font-bold">
              Kent Dodds
            </Text>
            <Text as="div" tw="text-muted">
              Engineering
            </Text>
          </Box>
        </HStack>
      </Card>

      <Card size="md" style={{ width: 400 }}>
        <HStack spacing={3} center="y">
          <Avatar src="https://bit.ly/kent-c-dodds" fallback="K" tw="rounded-full" size="lg" />

          <Box>
            <Text as="div" tw="font-bold" size={4}>
              Kent Dodds
            </Text>
            <Text as="div" tw="text-muted" size={4}>
              Engineering
            </Text>
          </Box>
        </HStack>
      </Card>

      <Card size="lg" style={{ width: 500 }}>
        <HStack spacing={4} center="y">
          <Avatar src="https://bit.ly/kent-c-dodds" fallback="K" tw="rounded-full" size="xl" />

          <Box>
            <Text as="div" tw="font-bold" size={5}>
              Kent Dodds
            </Text>
            <Text as="div" tw="text-muted" size={5}>
              Engineering
            </Text>
          </Box>
        </HStack>
      </Card>
    </VStack>
  ),
};

export const Variants = {
  render: () => (
    <VStack spacing={4}>
      <Card style={{ width: 400 }}>
        <HStack spacing={3} center="y">
          <Avatar src="https://bit.ly/kent-c-dodds" fallback="K" tw="rounded-full" size="lg" />

          <Box>
            <Text as="div" tw="font-bold" size={4}>
              Kent Dodds
            </Text>
            <Text as="div" tw="text-muted" size={4}>
              Engineering
            </Text>
          </Box>
        </HStack>
      </Card>

      <Card style={{ width: 400 }} variant="ghost">
        <HStack spacing={3} center="y">
          <Avatar src="https://bit.ly/kent-c-dodds" fallback="K" tw="rounded-full" size="lg" />

          <Box>
            <Text as="div" tw="font-bold" size={4}>
              Kent Dodds
            </Text>
            <Text as="div" tw="text-muted" size={4}>
              Engineering
            </Text>
          </Box>
        </HStack>
      </Card>
    </VStack>
  ),
};

export const Transparency = {
  render: () => (
    <Box
      tw="relative flex items-center justify-center overflow-hidden rounded-2xl shadow-border"
      style={{ width: 800, height: 500 }}
    >
      <Box tw="absolute inset-0 flex items-center justify-center">
        <ThemesPanelBackgroundImage id="1" width="900" height="200%" style={{ opacity: 0.5 }} />
      </Box>

      <Card style={{ width: 400 }} size="lg">
        <VStack spacing={10}>
          <Heading tw="ml-px">Sign up</Heading>

          <VStack spacing={6}>
            <Box>
              <Label tw="mb-2 ml-px block">Email Address</Label>
              <Input placeholder="Enter your email" />
            </Box>

            <Box>
              <Label tw="mb-2 ml-px block">Password</Label>
              <Input type="password" />
            </Box>
          </VStack>

          <HStack>
            <Button variant="solid" intent="primary">
              Sign in
            </Button>
          </HStack>
        </VStack>
      </Card>
    </Box>
  ),
};
