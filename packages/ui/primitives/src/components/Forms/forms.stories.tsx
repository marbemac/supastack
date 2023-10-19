import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '../Button/index.ts';
import { AutoForm } from './auto-form.tsx';
import { Form } from './form.tsx';
import { FormInputField } from './input-field.tsx';

const meta = {
  title: 'Components / Forms',
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Must be at least 2 characters',
  }),

  password: z.string().min(8, {
    message: 'Must be at least 8 characters',
  }),
});

export const Basic: Story = {
  render: function Basic() {
    const methods = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = data => {
      alert(`Submitted\n\n${JSON.stringify(data, null, 4)}`);
    };

    return (
      <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)} tw="w-80">
        <FormInputField
          control={methods.control}
          name="username"
          label="Username"
          description="This is your public display name."
          inputProps={{ placeholder: 'marbemac' }}
          isRequired
        />

        <FormInputField
          control={methods.control}
          name="password"
          label="Password"
          inputProps={{ type: 'password' }}
          isRequired
        />

        <Button type="submit" variant="solid">
          Submit
        </Button>
      </Form>
    );
  },
};

export const AutoForm1: Story = {
  name: 'AutoForm',
  render: function AutoForm1() {
    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = data => {
      alert(`Submitted\n\n${JSON.stringify(data, null, 4)}`);
    };

    return (
      <AutoForm
        tw="w-80"
        formSchema={FormSchema}
        onSubmit={onSubmit}
        fieldConfig={{
          username: {
            description: 'This is your public display name.',
            inputProps: {
              placeholder: 'marbemac',
            },
          },
          password: {
            inputProps: {
              type: 'password',
            },
          },
        }}
      >
        <Button type="submit" variant="solid">
          Submit
        </Button>
      </AutoForm>
    );
  },
};
