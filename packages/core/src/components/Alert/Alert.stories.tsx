import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert } from './Alert';

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32, maxWidth: 560 }}>
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    variant: 'info',
    title: 'Heads up',
    children: 'This is an inline alert.',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['success', 'warning', 'error', 'info'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Saved',
    children: 'Your changes were saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Heads up',
    children: 'Your session expires in 5 minutes.',
  },
};

export const Errored: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong',
    children: 'We could not load your data. Please try again.',
  },
};

export const TitleOnly: Story = {
  args: { variant: 'success', title: 'Saved', children: undefined },
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    title: undefined,
    children: 'Heads up — we updated the privacy policy.',
  },
};

export const Dismissible: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(true);
      return (
        <Stack>
          {open ? (
            <Alert variant="success" title="Saved" onClose={() => setOpen(false)}>
              Your changes were saved successfully.
            </Alert>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              style={{
                alignSelf: 'flex-start',
                padding: '8px 12px',
                border: '2.5px solid var(--ank-ink)',
                background: 'var(--ank-white)',
                boxShadow: '4px 4px 0 var(--ank-shadow-color)',
                fontFamily: 'var(--ank-body)',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Show alert
            </button>
          )}
        </Stack>
      );
    };
    return <Demo />;
  },
};

export const AllVariants: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Stack>
      <Alert variant="info" title="Heads up">
        A new release is rolling out tomorrow morning.
      </Alert>
      <Alert variant="success" title="Saved">
        Your changes were saved successfully.
      </Alert>
      <Alert variant="warning" title="Session expiring">
        You will be signed out in 5 minutes.
      </Alert>
      <Alert variant="error" title="Upload failed">
        The file is larger than the 10 MB limit.
      </Alert>
    </Stack>
  ),
};
