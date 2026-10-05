import {
  forwardRef,
  useId,
  useState,
  useSyncExternalStore,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { useModalDialog } from '../../hooks/useModalDialog';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './Navbar.css';
import { MenuIcon, CloseIcon } from '../Icon';

type NavbarLinkClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;

type NavbarLinkTarget =
  | { href: string; external?: boolean; onClick?: NavbarLinkClick }
  | { href?: undefined; external?: undefined; onClick: NavbarLinkClick };

export type NavbarLink = NavbarLinkTarget & {
  label: ReactNode;
  active?: boolean;
  key?: string | number;
};

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
};
const subscribeToNothing = () => () => {};
const isPageScrolled = () => window.scrollY > 0;
const isPageScrolledOnServer = () => false;

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  brand?: ReactNode;
  links?: NavbarLink[];
  actions?: ReactNode;
  sticky?: boolean;
  menuLabel?: string;
  menuCloseLabel?: string;
  externalLabel?: string;
  'aria-label'?: string;
}

const renderLink = (
  link: NavbarLink,
  className: string,
  externalLabel: string,
  onActivate?: () => void,
) => {
  const ariaCurrent = link.active ? ('page' as const) : undefined;

  const handleClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    link.onClick?.(event);
    if (!event.defaultPrevented) {
      onActivate?.();
    }
  };

  const commonProps = {
    className,
    'aria-current': ariaCurrent,
    onClick: handleClick,
  };

  if (link.href) {
    const externalAttrs: AnchorHTMLAttributes<HTMLAnchorElement> = link.external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return (
      <a href={link.href} {...externalAttrs} {...commonProps}>
        {link.label}
        {link.external && <VisuallyHidden> ({externalLabel})</VisuallyHidden>}
      </a>
    );
  }

  return (
    <button type="button" {...commonProps}>
      {link.label}
    </button>
  );
};

export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  {
    brand,
    links = [],
    actions,
    sticky = false,
    menuLabel = 'Open menu',
    menuCloseLabel = 'Close menu',
    externalLabel = 'opens in a new tab',
    className,
    'aria-label': ariaLabel = 'Primary',
    ...rest
  },
  ref,
) {
  const scrolled = useSyncExternalStore(
    sticky ? subscribeToScroll : subscribeToNothing,
    isPageScrolled,
    isPageScrolledOnServer,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerId = useId();
  const closeDrawer = () => setDrawerOpen(false);
  const { dialogRef, dialogHandlers } = useModalDialog({
    open: drawerOpen,
    onClose: closeDrawer,
    onBackdropPress: closeDrawer,
  });

  return (
    <>
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={clsx(
          'ank-navbar',
          sticky && 'ank-navbar--sticky',
          sticky && scrolled && 'ank-navbar--scrolled',
          className,
        )}
        {...rest}
      >
        {brand && <div className="ank-navbar__brand">{brand}</div>}

        {links.length > 0 && (
          <ul className="ank-navbar__links" role="list">
            {links.map((link, index) => (
              <li key={link.key ?? index}>{renderLink(link, 'ank-navbar__link', externalLabel)}</li>
            ))}
          </ul>
        )}

        {actions && <div className="ank-navbar__actions">{actions}</div>}

        <button
          type="button"
          aria-label={menuLabel}
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          onClick={() => setDrawerOpen(true)}
          className="ank-navbar__hamburger"
        >
          <MenuIcon size={20} />
        </button>
      </nav>

      <dialog
        ref={dialogRef}
        id={drawerId}
        aria-label={ariaLabel}
        className="ank-navbar-drawer"
        onCancel={(event) => {
          if (event.target !== event.currentTarget) return;
          event.preventDefault();
          closeDrawer();
        }}
        {...dialogHandlers}
      >
        {drawerOpen && (
          <>
            <header className="ank-navbar-drawer__header">
              <div className="ank-navbar-drawer__brand">{brand}</div>
              <button
                type="button"
                aria-label={menuCloseLabel}
                onClick={closeDrawer}
                className="ank-navbar-drawer__close"
              >
                <CloseIcon size={14} />
              </button>
            </header>
            {links.length > 0 && (
              <ul className="ank-navbar-drawer__links" role="list">
                {links.map((link, index) => (
                  <li key={link.key ?? index}>
                    {renderLink(link, 'ank-navbar-drawer__link', externalLabel, closeDrawer)}
                  </li>
                ))}
              </ul>
            )}
            {actions && <div className="ank-navbar-drawer__actions">{actions}</div>}
          </>
        )}
      </dialog>
    </>
  );
});
