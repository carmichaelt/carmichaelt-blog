'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Building,
  FilePlus,
} from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export function SiteHeader() {
  const [titleState, setTitleState] = useState('Carmichaelt. Blog');
  const [currentIcon, setCurrentIcon] = useState<React.ComponentType<{ className: string }>>(Building);
  const pathname = usePathname();

  // This component dynamically selects the appropriate icon and title based on the current pathname
  // It supports both exact matches and dynamic routes (like /edit/:id)

  const adminNavItems = [
    {
      name: 'All Posts',
      href: `/`,
      icon: BookOpen,
    },
    {
      name: 'Create Post',
      href: `/create-post`,
      icon: FilePlus,
    },
  ];

  // Combine all routes
  const allRoutes = [...adminNavItems];

  useEffect(() => {
    const currentItem = allRoutes.find(item => {
      // Handle exact matches and dynamic routes
      if (item.href === pathname) return true;

      // Handle dynamic routes like /edit/:id
      if (item.href.includes(':id')) {
        const pattern = item.href.replace(':id', '[^/]+');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(pathname);
      }

      return false;
    });

    if (currentItem) {
      setTitleState(currentItem.name);
      setCurrentIcon(currentItem.icon);
    } else {
      setTitleState('Carmichaelt. Blog');
      setCurrentIcon(Building);
    }
  }, [pathname]);
  
  const isMac = typeof window !== 'undefined' && window.navigator.userAgent.includes('Mac');
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="-ml-1" />
          </TooltipTrigger>
          <TooltipContent side="right">
            {isMac ? (
                <kbd className="rounded bg-black px-1.5 py-0.5 text-xs font-mono font-semibold">⌘ + B</kbd>
              ) : (
                <kbd className="rounded bg-black px-1.5 py-0.5 text-xs font-mono font-semibold">Ctrl + B</kbd>
              )}
          </TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        {React.createElement(currentIcon, { className: 'h-4 w-4' })}
        <h1 className="text-base font-medium">{titleState}</h1>
      </div>
    </header>
  );
}
