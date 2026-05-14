import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Table } from './Table';

const Basic = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell numeric>Seats</Table.HeadCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Ada</Table.Cell>
        <Table.Cell numeric>5</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Grace</Table.Cell>
        <Table.Cell numeric>12</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

describe('Table', () => {
  it('renders rows and columns', () => {
    render(<Basic />);
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '5' })).toBeInTheDocument();
  });

  it('marks column headers with scope="col" by default', () => {
    render(<Basic />);
    const header = screen.getByRole('columnheader', { name: 'Name' });
    expect(header).toHaveAttribute('scope', 'col');
  });

  it('exposes caption as the accessible name of the wrapper region', () => {
    render(
      <Table caption="Active subscriptions">
        <Table.Body>
          <Table.Row>
            <Table.Cell>row</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(screen.getByRole('region', { name: 'Active subscriptions' })).toBeInTheDocument();
  });

  it('does not wrap in a region when no caption is provided', () => {
    render(<Basic />);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('renders a sortable head cell as a button and reflects aria-sort on the th', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell sortable sortDirection="ascending" onSort={onSort}>
              Name
            </Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>row</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    const header = screen.getByRole('columnheader', { name: /name/i });
    expect(header).toHaveAttribute('aria-sort', 'ascending');
    const button = within(header).getByRole('button');
    await user.click(button);
    expect(onSort).toHaveBeenCalledTimes(1);
  });

  it('omits aria-sort when the column is not sortable', () => {
    render(<Basic />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).not.toHaveAttribute('aria-sort');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Basic />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
