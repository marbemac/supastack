/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SelectContent, SelectGroup, SelectItem, SelectRoot, SelectTrigger } from './select.tsx';

const meta = {
  title: 'Components / Select',
  component: SelectRoot,
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof SelectRoot>;

export const Basic: Story = {
  render: () => {
    const [value, updateValue] = useState('cardinals');

    return (
      <SelectRoot value={value} onValueChange={updateValue}>
        <SelectTrigger />

        <SelectContent>
          <SelectGroup>
            <SelectItem value="cardinals">Cardinals</SelectItem>
            <SelectItem value="ravens" disabled>
              Ravens
            </SelectItem>
            <SelectItem value="cowboys">Cowboys</SelectItem>
            <SelectItem value="dolphins">Dolphins</SelectItem>
            <SelectItem value="broncos">Broncos</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    );
  },
};

export const Sizes: Story = {
  argTypes: {
    size: {
      options: ['sm', 'md'],
      defaultValue: 'md',
      control: 'inline-radio',
    },
  },
  render: args => {
    const [value, updateValue] = useState('cardinals');

    return (
      <SelectRoot {...args} value={value} onValueChange={updateValue}>
        <SelectTrigger />

        <SelectContent>
          <SelectGroup>
            <SelectItem value="cardinals">Cardinals</SelectItem>
            <SelectItem value="ravens">Ravens</SelectItem>
            <SelectItem value="cowboys">Cowboys</SelectItem>
            <SelectItem value="dolphins">Dolphins</SelectItem>
            <SelectItem value="broncos">Broncos</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    );
  },
};

export const Triggers: StoryObj<typeof SelectTrigger> = {
  argTypes: {
    variant: {
      options: ['outline', 'ghost', 'solid', 'soft'],
      defaultValue: 'outline',
      control: 'inline-radio',
    },
  },
  render: args => {
    const [value, updateValue] = useState('cardinals');

    return (
      <SelectRoot value={value} onValueChange={updateValue}>
        <SelectTrigger {...args} />

        <SelectContent>
          <SelectGroup>
            <SelectItem value="cardinals">Cardinals</SelectItem>
            <SelectItem value="ravens">Ravens</SelectItem>
            <SelectItem value="cowboys">Cowboys</SelectItem>
            <SelectItem value="dolphins">Dolphins</SelectItem>
            <SelectItem value="broncos">Broncos</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    );
  },
};

export const Groups: Story = {
  argTypes: {
    size: {
      options: ['sm', 'md'],
      defaultValue: 'md',
      control: 'inline-radio',
    },
  },
  render: args => {
    const [value, updateValue] = useState('all');

    return (
      <SelectRoot {...args} value={value} onValueChange={updateValue}>
        <SelectTrigger />

        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Teams</SelectItem>
            <SelectItem value="none">No Team</SelectItem>
          </SelectGroup>

          <SelectGroup label="ACF East">
            <SelectItem value="bills">Buffalo Bills</SelectItem>
            <SelectItem value="dolphins">Miami Dolphins</SelectItem>
            <SelectItem value="patriots">New England Patriots</SelectItem>
            <SelectItem value="jets">New York Jets</SelectItem>
          </SelectGroup>
          <SelectGroup label="NFC North">
            <SelectItem value="bears">Chicago Bears</SelectItem>
            <SelectItem value="lions">Detroit Lions</SelectItem>
            <SelectItem value="packers">Green Bay Packers</SelectItem>
            <SelectItem value="vikings">Minnesota Vikings</SelectItem>
          </SelectGroup>
          <SelectGroup label="NFC West">
            <SelectItem value="cardinals">Arizona Cardinals</SelectItem>
            <SelectItem value="rams">Los Angeles Rams</SelectItem>
            <SelectItem value="49ers">San Francisco 49ers</SelectItem>
            <SelectItem value="seahawks">Seattle Seahawks</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    );
  },
};
