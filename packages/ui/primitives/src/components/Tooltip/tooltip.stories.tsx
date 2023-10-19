import type { Meta } from '@storybook/react';

import { Button } from '../Button/index.ts';
import { VStack } from '../Stack/index.ts';
import { Tooltip } from './tooltip.tsx';

const meta = {
  title: 'Components / Tooltip',
  component: Tooltip,
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta<typeof Tooltip>;

export default meta;

export const Basic = {
  render: () => (
    <VStack spacing={4}>
      <Tooltip
        content="I am a tooltip with a bunch of text that will not wrap since multiline defaults to false"
        defaultOpen
      >
        <Button>Login</Button>
      </Tooltip>

      <Tooltip
        content="I am a tooltip with a bunch of text that WILL wrap since multiline is set to true"
        defaultOpen
        multiline
        side="bottom"
      >
        <Button>Login</Button>
      </Tooltip>
    </VStack>
  ),
};
