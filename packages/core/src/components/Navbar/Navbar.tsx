import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import './Navbar.css';

export interface NavbarLink {
  label: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  active?: boolean;
  external?: boolean;
  key?: string | number;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  brand?: ReactNode;
  links?: NavbarLink[];
  actions?: ReactNode;
  sticky?: boolean;
  menuLabel?: string;
  menuCloseLabel?: string;
  'aria-label'?: string;
}

const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="square" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="square" />
  </svg>
);

const renderLink = (link: NavbarLink, className: string, onActivate?: () => void) => {
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
    className,
    'aria-label': ariaLabel = 'Primary',
    ...rest
  },
  ref,
) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerTitleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!sticky) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sticky]);

  useFocusTrap({
    active: drawerOpen,
    containerRef: drawerRef,
    onEscape: () => setDrawerOpen(false),
    lockScroll: true,
  });

  const closeDrawer = () => setDrawerOpen(false);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeDrawer();
    }
  };

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
              <li key={link.key ?? index}>
                {renderLink(link, 'ank-navbar__link')}
              </li>
            ))}
          </ul>
        )}

        {actions && <div className="ank-navbar__actions">{actions}</div>}

        <button
          ref={hamburgerRef}
          type="button"
          aria-label={menuLabel}
          aria-expanded={drawerOpen}
          aria-controls={drawerTitleId}
          onClick={() => setDrawerOpen(true)}
          className="ank-navbar__hamburger"
        >
          <HamburgerIcon />
        </button>
      </nav>

      {mounted && drawerOpen &&
        createPortal(
          <div className="ank-navbar-overlay" onMouseDown={handleOverlayClick}>
            <div
              ref={drawerRef}
              id={drawerTitleId}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              tabIndex={-1}
              className="ank-navbar-drawer"
            >
              <header className="ank-navbar-drawer__header">
                <div className="ank-navbar-drawer__brand">{brand}</div>
                <button
                  type="button"
                  aria-label={menuCloseLabel}
                  onClick={closeDrawer}
                  className="ank-navbar-drawer__close"
                >
                  <CloseIcon />
                </button>
              </header>
              {links.length > 0 && (
                <ul className="ank-navbar-drawer__links" role="list">
                  {links.map((link, index) => (
                    <li key={link.key ?? index}>
                      {renderLink(link, 'ank-navbar-drawer__link', closeDrawer)}
                    </li>
                  ))}
                </ul>
              )}
              {actions && (
                <div className="ank-navbar-drawer__actions">{actions}</div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
});
