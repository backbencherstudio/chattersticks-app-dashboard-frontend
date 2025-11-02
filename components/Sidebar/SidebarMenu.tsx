'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import UserManagementIconAC from '@/components/CustomIcon/Sidebar/ActiveIcon/UserManagementIconAC';


import SettingsIconAc from '@/components/CustomIcon/Sidebar/ActiveIcon/SettingsIconAc';
import IdeaManagementIcon from '@/components/CustomIcon/Sidebar/DeactiveIcon/IdeaManagementIcon';
import IdeaManagementIconAc from '@/components/CustomIcon/Sidebar/ActiveIcon/IdeaManagementIconAc';

import DashboardIcon from '@/components/CustomIcon/Sidebar/DeactiveIcon/DashboardIcon';
import UserManagementIcon from '@/components/CustomIcon/Sidebar/DeactiveIcon/UserManagementIcon';
import ComicManagementIcon from '@/components/CustomIcon/Sidebar/DeactiveIcon/ComicManagementIcon';
import ComicManagementIconAc from '@/components/CustomIcon/Sidebar/ActiveIcon/ComicManagementIconAc';


import DashboardIconAc from '@/components/CustomIcon/Sidebar/ActiveIcon/DashboardIconAc';


// ---------- TYPES ----------
interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  activeIcon: React.ComponentType<{ className?: string }>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface NavLinkProps {
  item: SidebarItem;
  isCollapsed: boolean;
  onMobileMenuClose: () => void;
}

interface SideBarMenuProps {
  isCollapsed: boolean;
  onMobileMenuClose: () => void;
}

// ---------- DATA ----------
const sidebarMenu: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    activeIcon: DashboardIconAc,
    href: '/dashboard',
  },
  {
    title: 'User Management',
    icon: UserManagementIcon,
    activeIcon: UserManagementIconAC,
    href: '/user-management',
  },
  {
    title: 'Comic Management',
    icon: ComicManagementIcon,
    activeIcon: ComicManagementIconAc,
    href: '/comic-management',
  },
  {
    title: 'Idea Management',
    icon: IdeaManagementIcon,
    activeIcon: IdeaManagementIconAc,
    href: '/idea-management',
  },
  
  
];

// ---------- COMPONENTS ----------
const NavLink: React.FC<NavLinkProps> = ({
  item,
  isCollapsed,
  onMobileMenuClose,
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + '/');
  const IconComponent =
    isActive && item.activeIcon ? item.activeIcon : item.icon;

  const handleLinkClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      onMobileMenuClose();
    }
  };

  if (item.onClick) {
    return (
      <button
        onClick={e => {
          item.onClick?.(e);
          handleLinkClick();
        }}
        className={`
          w-full flex items-center text-[15px] cursor-pointer font-[600]
          ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'}
          p-3 rounded-lg text-[#4A4C56] hover:bg-gray-100
          ${
            isActive
              ? 'bg-[#5B9BF4] text-white border border-[#F1C27D]/30'
              : ''
          }
        `}
        title={isCollapsed ? item.title : ''}
      >
        <IconComponent
          className={`w-5 h-5 shrink-0 ${
            isActive ? 'text-[#1E90FF]' : 'text-gray-500'
          }`}
        />
        <span
          className={`
            transition-all duration-300 ease-in-out
            ${
              isCollapsed
                ? 'opacity-0 max-w-0 ml-0'
                : 'opacity-100 max-w-[160px] ml-2'
            }
            ${isActive ? 'font-medium' : ''}
            overflow-hidden whitespace-nowrap align-middle inline-block
          `}
        >
          {item.title}
        </span>
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={handleLinkClick}
      className={`
        flex items-center text-sm font-medium 
        ${isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'}
        p-3 rounded-lg
        ${
          isActive
            ? 'bg-[#5B9BF4] text-white'
            : 'text-[#444950] hover:bg-[#1141CB1A]/40 transition-all duration-300 ease-in-out'
        }
      `}
      title={isCollapsed ? item.title : ''}
    >
      <IconComponent
        className={`text-xl shrink-0 ${
          isActive ? 'text-[#1E90FF]' : 'text-gray-500'
        }`}
      />
      <span
        className={`
          transition-all duration-300 ease-in-out
          ${
            isCollapsed
              ? 'opacity-0 max-w-0 ml-0'
              : 'opacity-100 max-w-[160px] ml-2'
          }
          ${isActive ? 'font-medium' : ''}
          overflow-hidden whitespace-nowrap align-middle inline-block
        `}
      >
        {item.title}
      </span>
    </Link>
  );
};

const SideBarMenu: React.FC<SideBarMenuProps> = ({
  isCollapsed,
  onMobileMenuClose,
}) => {
  return (
    <nav className={`px-4 space-y-3 ${isCollapsed ? 'px-2' : ''}`}>
      <div className="space-y-5 text-sm">
        {sidebarMenu.map((item, iIdx) => (
          <NavLink
            key={iIdx}
            item={item}
            isCollapsed={isCollapsed}
            onMobileMenuClose={onMobileMenuClose}
          />
        ))}
      </div>
    </nav>
  );
};

export default SideBarMenu;
