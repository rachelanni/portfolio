'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { IconLogout, IconMenu2, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { DynamicIcon } from './DynamicIcon';
import { useSidebar } from './ui/sidebar';

interface NavItem {
  title?: string | null;
  href?: string | null;
  icon?: string | null;
  isExternal?: boolean | null;
}

interface FloatingDockClientProps {
  navItems: NavItem[];
}

interface DockLink {
  title: string;
  href?: string;
  icon: React.ReactNode;
  isExternal?: boolean | null;
  onClick?: () => void;
}

const MAX_VISIBLE_ITEMS_DESKTOP = 6;
const MAX_VISIBLE_ITEMS_MOBILE = 8;

const getVisibleLinks = (links: DockLink[], maxItems: number) => {
  const shouldShowMore = links.length > maxItems;
  return {
    shouldShowMore,
    visible: shouldShowMore ? links.slice(0, maxItems) : links,
    hidden: shouldShowMore ? links.slice(maxItems) : [],
  };
};

export function FloatingDockClient({ navItems }: FloatingDockClientProps) {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { open, isMobile, openMobile } = useSidebar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMoreMenuOpen, setDesktopMoreMenuOpen] = useState(false);
  const [mobileMoreMenuOpen, setMobileMoreMenuOpen] = useState(false);

  const isSidebarOpen = isMobile ? openMobile : open;

  const links: DockLink[] = [
    ...navItems.map((item) => ({
      title: item.title || '',
      href: item.href || '#',
      icon: <DynamicIcon iconName={item.icon || 'IconHome'} />,
      isExternal: item.isExternal,
    })),
    ...(isSignedIn && !isSidebarOpen
      ? [
          {
            title: 'Sign Out',
            icon: <IconLogout className="h-full w-full" />,
            onClick: () => signOut(),
          },
        ]
      : []),
  ];

  const desktop = getVisibleLinks(links, MAX_VISIBLE_ITEMS_DESKTOP);
  const mobile = getVisibleLinks(links, MAX_VISIBLE_ITEMS_MOBILE);

  return (
    <>
      {/* Desktop: Horizontal dock - bottom left on md, bottom center on lg+ */}
      <div
        className={`group/dock pointer-events-none fixed z-30 hidden transition-all duration-300 md:block ${
          isSidebarOpen
            ? '-translate-x-1/2 bottom-0 left-[calc(50%-var(--sidebar-width)/2)] pb-3'
            : 'lg:-translate-x-1/2 bottom-4 md:left-4 md:translate-x-0 lg:left-1/2'
        }`}
      >
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-3 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/30 md:rounded-2xl dark:border-white/20 dark:bg-black/30 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] dark:hover:border-white/30 dark:hover:bg-black/40">
          {desktop.visible.map((item) => (
            <DockIcon key={`${item.title}-${item.href}`} item={item} isVertical={false} />
          ))}

          {/* Desktop More Menu Button */}
          {desktop.shouldShowMore && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDesktopMoreMenuOpen(!desktopMoreMenuOpen)}
                className="group relative flex h-12 w-12 items-center justify-center md:h-12 md:w-12"
              >
                <div className="group-hover/dock:border-white/50 group-hover/dock:bg-white/40 dark:group-hover/dock:bg-white/20 dark:group-hover/dock:border-white/30 relative flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-500 ease-out hover:scale-125 hover:bg-white/50 hover:-translate-y-2 hover:border-white/70 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:dark:border-white/40 hover:dark:bg-white/30 md:hover:-translate-y-3 dark:border-white/10 dark:bg-white/5">
                  <div className="h-6 w-6 text-neutral-400/60 transition-colors duration-300 group-hover/dock:text-neutral-500 md:h-6 md:w-6 dark:text-neutral-300/60 dark:group-hover/dock:text-neutral-200">
                    {desktopMoreMenuOpen ? (
                      <IconX className="h-6 w-6" />
                    ) : (
                      <IconMenu2 className="h-6 w-6" />
                    )}
                  </div>
                </div>
                {/* Tooltip */}
                <div className="-top-9 md:-top-12 -translate-x-1/2 group-hover:-translate-y-2 pointer-events-none absolute left-1/2 scale-90 whitespace-nowrap rounded-xl border border-white/40 bg-white/90 px-3 py-1.5 font-medium text-neutral-800 text-xs opacity-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 md:text-sm dark:border-white/20 dark:bg-black/90 dark:text-neutral-200">
                  More
                  <div className="-bottom-1 -translate-x-1/2 absolute left-1/2 h-2 w-2 rotate-45 border-white/40 border-r border-b bg-white/90 dark:border-white/20 dark:bg-black/90" />
                </div>
              </button>

              {/* Desktop More Menu - Expands Upward */}
              {desktopMoreMenuOpen && (
                <div className="-translate-x-1/2 slide-in-from-bottom-2 absolute bottom-16 left-1/2 z-100 flex animate-in flex-col-reverse gap-2 rounded-xl border border-white/40 bg-white/90 p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl duration-200 dark:border-white/30 dark:bg-black/90 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
                  {desktop.hidden.map((item) => (
                    <DockIcon
                      key={`${item.title}-${item.href}-more`}
                      item={item}
                      isVertical={true}
                      onItemClick={() => setDesktopMoreMenuOpen(false)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Hamburger menu button at top right */}
      <div className="fixed top-4 right-4 z-30 md:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 text-neutral-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/30 hover:text-neutral-600 dark:border-white/20 dark:bg-black/30 dark:text-neutral-300 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] dark:hover:border-white/30 dark:hover:bg-black/40 dark:hover:text-neutral-200"
        >
          {mobileMenuOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
        </button>

        {/* Mobile Vertical menu */}
        {mobileMenuOpen && (
          <div className="slide-in-from-top-2 absolute top-14 right-0 z-100 flex animate-in flex-col gap-2 rounded-xl border border-white/40 bg-white/90 p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl duration-200 dark:border-white/30 dark:bg-black/90 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
            {mobile.visible.map((item) => (
              <DockIcon
                key={`${item.title}-${item.href}-mobile`}
                item={item}
                isVertical={true}
                onItemClick={() => setMobileMenuOpen(false)}
              />
            ))}

            {/* Mobile More Menu Button */}
            {mobile.shouldShowMore && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMobileMoreMenuOpen(!mobileMoreMenuOpen)}
                  className="group relative flex h-12 w-12 items-center justify-center"
                >
                  <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/40 bg-white/25 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/60 hover:bg-gray-500/10 dark:border-white/20 dark:bg-white/10 dark:hover:border-white/30 dark:hover:bg-white/20">
                    <div className="h-6 w-6 text-neutral-500 dark:text-neutral-300">
                      {mobileMoreMenuOpen ? (
                        <IconX className="h-6 w-6" />
                      ) : (
                        <IconMenu2 className="h-6 w-6" />
                      )}
                    </div>
                  </div>
                  {/* Tooltip */}
                  <div className="-translate-y-1/2 group-hover:-translate-x-1 pointer-events-none absolute top-1/2 right-14 scale-90 whitespace-nowrap rounded-lg border border-white/40 bg-white/90 px-3 py-1.5 font-medium text-neutral-800 text-sm opacity-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 dark:border-white/20 dark:bg-black/90 dark:text-neutral-200">
                    More
                    <div className="-right-1 -translate-y-1/2 absolute top-1/2 h-2 w-2 rotate-45 border-white/40 border-t border-r bg-white/90 dark:border-white/20 dark:bg-black/90" />
                  </div>
                </button>

                {/* Mobile More Menu - Expands Sideways (to the left) */}
                {mobileMoreMenuOpen && (
                  <div className="slide-in-from-right-2 absolute top-0 right-16 z-110 flex animate-in flex-row-reverse gap-2 rounded-xl border border-white/40 bg-white/90 p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl duration-200 dark:border-white/30 dark:bg-black/90 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
                    {mobile.hidden.map((item) => (
                      <DockIcon
                        key={`${item.title}-${item.href}-mobile-more`}
                        item={item}
                        isVertical={false}
                        onItemClick={() => {
                          setMobileMoreMenuOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function DockIcon({
  item,
  isVertical,
  onItemClick,
}: {
  item: DockLink;
  isVertical: boolean;
  onItemClick?: () => void;
}) {
  const baseIconClasses =
    'relative flex items-center justify-center w-full h-full rounded-full backdrop-blur-md transition-all';
  const verticalIconClasses = `${baseIconClasses} bg-white/40 dark:bg-white/20 border border-white/50 dark:border-white/30 duration-300 hover:scale-110 hover:bg-white/50 dark:hover:bg-white/30 hover:border-white/70 dark:hover:border-white/40`;
  const horizontalIconClasses = `${baseIconClasses} bg-white/10 dark:bg-white/5 group-hover/dock:bg-white/40 dark:group-hover/dock:bg-white/20 border border-white/20 dark:border-white/10 group-hover/dock:border-white/50 dark:group-hover/dock:border-white/30 duration-500 ease-out hover:scale-125 hover:-translate-y-2 md:hover:-translate-y-3 hover:!bg-white/50 dark:hover:!bg-white/30 hover:!border-white/70 dark:hover:!border-white/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]`;

  const Tooltip = ({ direction }: { direction: 'vertical' | 'horizontal' }) => {
    const isHorizontal = direction === 'horizontal';
    return (
      <div
        className={`absolute px-3 py-1.5 ${isHorizontal ? 'rounded-xl' : 'rounded-lg'} border border-white/40 bg-white/90 backdrop-blur-xl dark:border-white/20 dark:bg-black/90 ${isHorizontal ? 'text-xs md:text-sm' : 'text-sm'} pointer-events-none scale-90 whitespace-nowrap font-medium text-neutral-800 opacity-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 dark:text-neutral-200 ${
          isHorizontal
            ? '-top-9 md:-top-12 -translate-x-1/2 group-hover:-translate-y-2 left-1/2'
            : '-translate-y-1/2 group-hover:-translate-x-1 top-1/2 right-14'
        }`}
      >
        {item.title}
        <div
          className={`absolute h-2 w-2 rotate-45 bg-white/90 dark:bg-black/90 ${
            isHorizontal
              ? '-bottom-1 -translate-x-1/2 left-1/2 border-r border-b'
              : '-right-1 -translate-y-1/2 top-1/2 border-t border-r'
          } border-white/40 dark:border-white/20`}
        />
      </div>
    );
  };

  const handleClick = (e?: React.MouseEvent) => {
    if (item.onClick) {
      e?.preventDefault();
      item.onClick();
    }
    onItemClick?.();
  };

  const content = (
    <>
      <div className={isVertical ? verticalIconClasses : horizontalIconClasses}>
        <div
          className={`h-6 w-6 md:h-6 md:w-6 ${
            isVertical
              ? 'text-neutral-500 dark:text-neutral-300'
              : 'text-neutral-400/60 transition-colors duration-300 group-hover/dock:text-neutral-500 hover:text-neutral-600 dark:text-neutral-300/60 dark:group-hover/dock:text-neutral-200'
          }`}
        >
          {item.icon}
        </div>
      </div>
      <Tooltip direction={isVertical ? 'vertical' : 'horizontal'} />
    </>
  );

  const wrapperClasses =
    'group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12';

  return item.onClick ? (
    <button type="button" onClick={handleClick} className={wrapperClasses}>
      {content}
    </button>
  ) : (
    <Link
      href={item.href || '#'}
      target={item.isExternal ? '_blank' : undefined}
      rel={item.isExternal ? 'noopener noreferrer' : undefined}
      className={wrapperClasses}
      scroll={!item.isExternal}
      onClick={onItemClick}
    >
      {content}
    </Link>
  );
}
