import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box/index.ts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion.tsx';

const meta = {
  title: 'Components / Accordion',
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: function Basic() {
    return (
      <Box tw="w-full max-w-xl">
        <Accordion type="single" collapsible tw="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>Yes. It&apos;s animated by default.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Box>
    );
  },
};
