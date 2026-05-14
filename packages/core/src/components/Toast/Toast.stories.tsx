import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button';

const meta = {
  title: 'ank.ds/Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Demo = () => {
  const toast = useToast();
  return (
    <div style={{ padding: 32, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button onClick={() => toast.success('Saved', { description: 'Your changes were saved.' })}>
        success
      </Button>
      <Button variant="sand" onClick={() => toast.warning('Heads up', { description: 'Session expires in 5 minutes.' })}>
        warning
      </Button>
      <Button variant="danger" onClick={() => toast.error('Upload failed', { description: 'File exceeds the 10 MB limit.' })}>
        error
      </Button>
      <Button variant="ghost" onClick={() => toast.info('Tip', { description: 'You can press ⌘K to open the command palette.' })}>
        info
      </Button>
      <Button variant="secondary" onClick={() =>
        toast.show({
          title: 'Friend request',
          description: 'Ada Lovelace wants to connect.',
          action: { label: 'View', onClick: () => alert('viewed') },
          duration: 0,
        })
      }>
        with action (persistent)
      </Button>
      <Button onClick={() => toast.dismissAll()}>Dismiss all</Button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};

export const TopRight: Story = {
  render: () => (
    <ToastProvider placement="top-right">
      <Demo />
    </ToastProvider>
  ),
};

export const TopCenter: Story = {
  render: () => (
    <ToastProvider placement="top-center">
      <Demo />
    </ToastProvider>
  ),
};

export const BottomLeft: Story = {
  render: () => (
    <ToastProvider placement="bottom-left">
      <Demo />
    </ToastProvider>
  ),
};
