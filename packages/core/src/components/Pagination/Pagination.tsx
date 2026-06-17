import { forwardRef, useMemo, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import './Pagination.css';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icon';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  itemLabel?: (page: number) => string;
}

const ELLIPSIS = '…' as const;

type PageEntry = number | typeof ELLIPSIS;

const buildPages = (page: number, total: number, sibling: number): PageEntry[] => {
  if (total <= 0) return [];
  if (total === 1) return [1];

  const range: PageEntry[] = [];
  const leftSibling = Math.max(page - sibling, 1);
  const rightSibling = Math.min(page + sibling, total);

  range.push(1);

  if (leftSibling > 3) {
    range.push(ELLIPSIS);
  } else if (leftSibling === 3) {
    range.push(2);
  }

  for (let i = Math.max(leftSibling, 2); i <= Math.min(rightSibling, total - 1); i += 1) {
    range.push(i);
  }

  if (rightSibling < total - 2) {
    range.push(ELLIPSIS);
  } else if (rightSibling === total - 2) {
    range.push(total - 1);
  }

  range.push(total);
  return range;
};

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    pageCount,
    onPageChange,
    siblingCount = 1,
    previousLabel = 'Previous page',
    nextLabel = 'Next page',
    itemLabel = (n) => `Page ${n}`,
    className,
    'aria-label': ariaLabel = 'Pagination',
    ...rest
  },
  ref,
) {
  const pages = useMemo(
    () => buildPages(page, pageCount, siblingCount),
    [page, pageCount, siblingCount],
  );

  const isFirst = page <= 1;
  const isLast = page >= pageCount;

  const go = (next: number) => {
    if (next === page) return;
    if (next < 1 || next > pageCount) return;
    onPageChange(next);
  };

  return (
    <nav ref={ref} aria-label={ariaLabel} className={clsx('ank-pagination', className)} {...rest}>
      <ol className="ank-pagination__list">
        <li className="ank-pagination__item">
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={isFirst}
            aria-label={previousLabel}
            className="ank-pagination__button"
          >
            <span className="ank-pagination__icon">
              <ChevronLeftIcon size={14} />
            </span>
          </button>
        </li>

        {pages.map((entry, index) =>
          entry === ELLIPSIS ? (
            <li key={`ellipsis-${index}`} className="ank-pagination__item">
              <span aria-hidden className="ank-pagination__ellipsis">
                {ELLIPSIS}
              </span>
            </li>
          ) : (
            <li key={entry} className="ank-pagination__item">
              <button
                type="button"
                onClick={() => go(entry)}
                aria-current={entry === page ? 'page' : undefined}
                aria-label={itemLabel(entry)}
                className="ank-pagination__button"
              >
                {entry}
              </button>
            </li>
          ),
        )}

        <li className="ank-pagination__item">
          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={isLast}
            aria-label={nextLabel}
            className="ank-pagination__button"
          >
            <span className="ank-pagination__icon">
              <ChevronRightIcon size={14} />
            </span>
          </button>
        </li>
      </ol>
    </nav>
  );
});
