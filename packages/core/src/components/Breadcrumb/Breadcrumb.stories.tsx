import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'ank.ds/Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
      <Breadcrumb.Item current>Tooltip</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const LongPath: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
      <Breadcrumb.Item href="/docs/components">Components</Breadcrumb.Item>
      <Breadcrumb.Item href="/docs/components/form">Form</Breadcrumb.Item>
      <Breadcrumb.Item current>FieldWrapper</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item current>Settings</Breadcrumb.Item>
    </Breadcrumb>
  ),
};
