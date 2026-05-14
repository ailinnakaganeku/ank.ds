import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'ank.ds/Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { page: 1, pageCount: 10, siblingCount: 1 },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Demo = ({ pageCount = 10, siblingCount = 1 }: { pageCount?: number; siblingCount?: number }) => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      pageCount={pageCount}
      siblingCount={siblingCount}
      onPageChange={setPage}
    />
  );
};

export const Default: Story = { render: () => <Demo /> };

export const Few: Story = { render: () => <Demo pageCount={4} /> };

export const ManyPages: Story = { render: () => <Demo pageCount={50} /> };

export const ManySiblings: Story = { render: () => <Demo pageCount={50} siblingCount={2} /> };
