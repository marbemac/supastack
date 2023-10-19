import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Box } from '../Box/box.tsx';
import { Button } from '../Button/index.ts';
import { Input } from '../Input/index.ts';
import { HStack, VStack } from '../Stack/index.ts';
import { Text } from '../Text/index.ts';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './dialog.tsx';

const meta = {
  title: 'Components / Dialog',
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: function Basic() {
    return (
      <Box tw="flex h-96 w-160 items-center justify-center rounded border">
        <Dialog>
          <DialogTrigger>
            <Button>Edit profile</Button>
          </DialogTrigger>

          <DialogContent tw="max-w-md">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile.</DialogDescription>

            <VStack spacing={3} tw="mb-8 mt-4">
              <label>
                <Text as="div" tw="mb-2 font-medium">
                  Name
                </Text>

                <Input defaultValue="Freja Johnsen" placeholder="Enter your full name" />
              </label>

              <label>
                <Text as="div" tw="mb-2 font-medium">
                  Email
                </Text>

                <Input defaultValue="freja@example.com" placeholder="Enter your email" />
              </label>
            </VStack>

            <HStack spacing={3} tw="justify-end">
              <DialogClose>
                <Button variant="soft">Cancel</Button>
              </DialogClose>

              <DialogClose>
                <Button>Save</Button>
              </DialogClose>
            </HStack>
          </DialogContent>
        </Dialog>
      </Box>
    );
  },
};

export const LongContent: Story = {
  render: function Basic() {
    return (
      <Box tw="flex h-96 w-160 items-center justify-center rounded border">
        <Dialog>
          <DialogTrigger>
            <Button>Open Long Content</Button>
          </DialogTrigger>

          <DialogContent tw="max-w-md">
            <DialogTitle>Lots of content</DialogTitle>

            <VStack spacing={1} divider>
              {Array.from({ length: 50 }, (item, index) => (
                <div key={index}>Element {index}</div>
              ))}
            </VStack>

            <HStack spacing={3} tw="justify-end">
              <DialogClose>
                <Button>Close</Button>
              </DialogClose>
            </HStack>
          </DialogContent>
        </Dialog>
      </Box>
    );
  },
};

export const Controlled: Story = {
  render: function Basic() {
    const [dialogIsOpen, updateDialogIsOpen] = useState(false);

    return (
      <Box tw="flex h-96 w-160 items-center justify-center rounded border">
        <Button onClick={() => updateDialogIsOpen(true)}>Open Long Content</Button>

        <Dialog open={dialogIsOpen} onOpenChange={updateDialogIsOpen}>
          <DialogContent tw="max-w-md">
            <DialogTitle>Controlled dialog</DialogTitle>

            <DialogDescription>The description.</DialogDescription>

            <HStack spacing={3} tw="justify-end">
              <DialogClose>
                <Button>Close</Button>
              </DialogClose>
            </HStack>
          </DialogContent>
        </Dialog>
      </Box>
    );
  },
};
