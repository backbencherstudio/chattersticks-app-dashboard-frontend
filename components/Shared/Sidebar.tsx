'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import SideBarMenu from '../Sidebar/SidebarMenu';
import Image from 'next/image';
import { Settings } from 'lucide-react';
import { destroyCookie } from 'nookies';
import { useSettingsModal } from '@/context/SettingsModalContext';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

export default function Sidebar({ isMobileMenuOpen, onMobileMenuClose }: SidebarProps) {
  const router = useRouter();
  const { openSettingsModal } = useSettingsModal();
  const [isCollapsed] = useState(false);
  const [isSettingsLoading, setIsSettingsLoading] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);


  const handleLogout = () => {
    setIsLogoutLoading(true);
    destroyCookie(null, 'access_token', { path: '/' });
    destroyCookie(null, 'refresh_token', { path: '/' });
    router.push('/login');
  };

  const handleSettings = () => {
    setIsSettingsLoading(true);
    openSettingsModal();
    setIsSettingsLoading(false); // close immediately if no async task
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 ${
        isCollapsed ? 'md:w-16' : 'w-72'
      } bg-[#E8F1FD] border-r border-[#E9E9E9] font-[inter] overflow-hidden flex flex-col`}
    >
      {/* Header */}
      <div className="flex relative items-center justify-between px-6 py-10">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isCollapsed
              ? 'opacity-0 max-w-0 w-0'
              : 'opacity-100 max-w-[220px] w-full'
          }`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`transition-all duration-300 ease-in-out inline-block align-middle ${
                isCollapsed
                  ? 'opacity-0 max-w-0 ml-0'
                  : 'opacity-100 max-w-40 ml-2'
              } overflow-hidden whitespace-nowrap`}
            >
              <Image
                src="/images/logo.png"
                alt="logo"
                width={100}
                height={100}
              />
            </span>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          className={`p-1 absolute right-0 top-2 cursor-pointer rounded-sm rounded-r-none bg-gray-100 hover:bg-gray-200 transition-all duration-300 md:hidden ${
            isCollapsed ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={onMobileMenuClose}
        >
          <IoMdClose className="w-6 h-6 text-gray-500 hover:text-gray-800 transition-all duration-300" />
        </button>
      </div>

      {/* Main Navigation - Scrollable */}
      <div className="flex-1 overflow-y-auto font-roboto">
        <SideBarMenu
          isCollapsed={isCollapsed}
          onMobileMenuClose={onMobileMenuClose}
        />
      </div>

      {/* Bottom Navigation */}
      <nav className={`p-1 ${isCollapsed ? 'px-2' : ''} shrink-0`}>
        {/* Settings Button */}
        <div className="pt-2">
          <button
            onClick={e => {
              e.stopPropagation(); // prevent click from bubbling
              handleSettings();
              if (window.innerWidth < 768) onMobileMenuClose();
            }}
            className={`w-full flex items-center text-[15px] cursor-pointer font-semibold transition-all duration-200 ${
              isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'
            } p-3 rounded-lg text-[#4A4C56] hover:bg-gray-100`}
            title={isCollapsed ? 'Settings' : ''}
          >
            <Settings className="w-5 h-5 shrink-0 text-gray-500" />
            <span
              className={`${
                isCollapsed
                  ? 'opacity-0 max-w-0'
                  : 'opacity-100 max-w-40 ml-2'
              } overflow-hidden`}
            >
              {isSettingsLoading ? 'Opening...' : 'Settings'}
            </span>
          </button>
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={e => {
              e.stopPropagation();
              handleLogout();
              if (window.innerWidth < 768) onMobileMenuClose();
            }}
            className={`w-full flex items-center text-[15px] cursor-pointer font-semibold transition-all duration-200 ${
              isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'
            } p-3 rounded-lg text-[#4A4C56] hover:bg-gray-100`}
            title={isCollapsed ? 'Logout' : ''}
            disabled={isLogoutLoading}
          >
            <FiLogOut className="w-5 h-5 shrink-0 text-gray-500" />
            <span
              className={`transition-all duration-300 ease-in-out ${
                isCollapsed
                  ? 'opacity-0 max-w-0 ml-0'
                  : 'opacity-100 max-w-40 ml-2'
              } overflow-hidden whitespace-nowrap align-middle inline-block`}
            >
              {isLogoutLoading ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
