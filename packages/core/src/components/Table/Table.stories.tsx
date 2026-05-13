import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Table } from './Table';
import { Badge } from '../Badge';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 32, maxWidth: 880 }}>{children}</div>
);

const rows = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', seats: 5, status: 'active' as const },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', seats: 12, status: 'active' as const },
  { id: 3, name: 'Margaret Hamilton', email: 'margaret@example.com', seats: 3, status: 'pending' as const },
  { id: 4, name: 'Katherine Johnson', email: 'kjohnson@example.com', seats: 8, status: 'active' as const },
  { id: 5, name: 'Hedy Lamarr', email: 'hedy@example.com', seats: 1, status: 'inactive' as const },
];

const statusVariant: Record<string, 'success' | 'warning' | 'outline'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'outline',
};

const meta = {
  title: 'ank.ds/Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Frame>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell numeric>Seats</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell numeric>{row.seats}</Table.Cell>
              <Table.Cell>
                <Badge variant={statusVariant[row.status]} size="sm">
                  {row.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Frame>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Frame>
      <Table caption="Active subscriptions">
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell numeric>Seats</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.slice(0, 3).map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell numeric>{row.seats}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Frame>
  ),
};

export const Sortable: Story = {
  render: () => {
    const Demo = () => {
      const [sortKey, setSortKey] = useState<'name' | 'seats' | null>('name');
      const [direction, setDirection] = useState<'ascending' | 'descending'>('ascending');

      const sorted = useMemo(() => {
        if (!sortKey) return rows;
        const copy = [...rows];
        copy.sort((a, b) => {
          const av = a[sortKey];
          const bv = b[sortKey];
          if (av === bv) return 0;
          const result = av > bv ? 1 : -1;
          return direction === 'ascending' ? result : -result;
        });
        return copy;
      }, [sortKey, direction]);

      const handleSort = (key: 'name' | 'seats') => {
        if (sortKey === key) {
          setDirection((d) => (d === 'ascending' ? 'descending' : 'ascending'));
        } else {
          setSortKey(key);
          setDirection('ascending');
        }
      };

      const directionFor = (key: 'name' | 'seats') =>
        sortKey === key ? direction : ('none' as const);

      return (
        <Frame>
          <Table caption="Subscriptions — sortable">
            <Table.Head>
              <Table.Row>
                <Table.HeadCell
                  sortable
                  sortDirection={directionFor('name')}
                  onSort={() => handleSort('name')}
                >
                  Name
                </Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell
                  numeric
                  sortable
                  sortDirection={directionFor('seats')}
                  onSort={() => handleSort('seats')}
                >
                  Seats
                </Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {sorted.map((row) => (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{row.email}</Table.Cell>
                  <Table.Cell numeric>{row.seats}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={statusVariant[row.status]} size="sm">
                      {row.status}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Frame>
      );
    };
    return <Demo />;
  },
};

export const StickyHeader: Story = {
  render: () => {
    const many = Array.from({ length: 40 }).map((_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      seats: ((i * 7) % 20) + 1,
    }));
    return (
      <Frame>
        <div style={{ maxHeight: 360, overflowY: 'auto', border: '3px solid var(--ank-ink)' }}>
          <Table stickyHeader>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell numeric>Seats</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {many.map((row) => (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{row.email}</Table.Cell>
                  <Table.Cell numeric>{row.seats}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Frame>
    );
  },
};

export const WithFooter: Story = {
  render: () => (
    <Frame>
      <Table caption="Invoice line items">
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Item</Table.HeadCell>
            <Table.HeadCell numeric>Qty</Table.HeadCell>
            <Table.HeadCell numeric>Unit price</Table.HeadCell>
            <Table.HeadCell numeric>Subtotal</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Pro plan</Table.Cell>
            <Table.Cell numeric>1</Table.Cell>
            <Table.Cell numeric>$24.00</Table.Cell>
            <Table.Cell numeric>$24.00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Extra seats</Table.Cell>
            <Table.Cell numeric>4</Table.Cell>
            <Table.Cell numeric>$6.00</Table.Cell>
            <Table.Cell numeric>$24.00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Storage add-on</Table.Cell>
            <Table.Cell numeric>1</Table.Cell>
            <Table.Cell numeric>$12.00</Table.Cell>
            <Table.Cell numeric>$12.00</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell colSpan={3}>Total</Table.Cell>
            <Table.Cell numeric>$60.00</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    </Frame>
  ),
};
