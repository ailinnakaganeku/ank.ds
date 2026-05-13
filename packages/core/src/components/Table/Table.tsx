import {
  forwardRef,
  useId,
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import clsx from 'clsx';
import './Table.css';

export type SortDirection = 'ascending' | 'descending' | 'none';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  caption?: ReactNode;
  stickyHeader?: boolean;
}

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  { caption, stickyHeader, className, children, ...rest },
  ref,
) {
  const captionId = useId();
  const wrapperProps = caption
    ? { tabIndex: 0, role: 'region' as const, 'aria-labelledby': captionId }
    : {};

  return (
    <div className="ank-table-wrapper" {...wrapperProps}>
      <table
        ref={ref}
        className={clsx('ank-table', stickyHeader && 'ank-table--sticky-header', className)}
        {...rest}
      >
        {caption && (
          <caption id={captionId} className="ank-table__caption">
            {caption}
          </caption>
        )}
        {children}
      </table>
    </div>
  );
});

const Head = ({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={className} {...rest}>
    {children}
  </thead>
);

const Body = ({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={className} {...rest}>
    {children}
  </tbody>
);

const Foot = ({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tfoot className={className} {...rest}>
    {children}
  </tfoot>
);

const Row = ({ className, children, ...rest }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={className} {...rest}>
    {children}
  </tr>
);

export interface HeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

const SortIcon = ({ direction }: { direction: SortDirection }) => {
  if (direction === 'ascending') {
    return (
      <svg
        className="ank-table__sort-icon"
        viewBox="0 0 10 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M2 6l3-3 3 3M5 3v10" strokeLinecap="square" />
      </svg>
    );
  }
  if (direction === 'descending') {
    return (
      <svg
        className="ank-table__sort-icon"
        viewBox="0 0 10 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M2 8l3 3 3-3M5 11V1" strokeLinecap="square" />
      </svg>
    );
  }
  return (
    <svg
      className="ank-table__sort-icon"
      viewBox="0 0 10 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M2 5l3-3 3 3M2 9l3 3 3-3" strokeLinecap="square" />
    </svg>
  );
};

const HeadCell = ({
  numeric,
  sortable,
  sortDirection = 'none',
  onSort,
  scope = 'col',
  className,
  children,
  ...rest
}: HeadCellProps) => {
  const ariaSort = sortable ? sortDirection : undefined;

  return (
    <th
      scope={scope}
      aria-sort={ariaSort}
      className={clsx(
        'ank-table__head-cell',
        numeric && 'ank-table__head-cell--numeric',
        className,
      )}
      {...rest}
    >
      {sortable ? (
        <button type="button" onClick={onSort} className="ank-table__sort-button">
          {children}
          <SortIcon direction={sortDirection} />
        </button>
      ) : (
        children
      )}
    </th>
  );
};

export interface CellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
}

const Cell = ({ numeric, className, children, ...rest }: CellProps) => (
  <td
    className={clsx('ank-table__cell', numeric && 'ank-table__cell--numeric', className)}
    {...rest}
  >
    {children}
  </td>
);

export const Table = Object.assign(TableRoot, {
  Head,
  Body,
  Foot,
  Row,
  HeadCell,
  Cell,
});
