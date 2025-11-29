import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Icons
import DashboardIconAc from "@/components/CustomIcon/Sidebar/ActiveIcon/DashboardIconAc";
import DashboardIcon from "@/components/CustomIcon/Sidebar/DeactiveIcon/DashboardIcon";

import UserManagementIconAC from "@/components/CustomIcon/Sidebar/ActiveIcon/UserManagementIconAC";
import UserManagementIcon from "@/components/CustomIcon/Sidebar/DeactiveIcon/UserManagementIcon";

import ComicManagementIconAc from "@/components/CustomIcon/Sidebar/ActiveIcon/ComicManagementIconAc";
import ComicManagementIcon from "@/components/CustomIcon/Sidebar/DeactiveIcon/ComicManagementIcon";

import IdeaManagementIconAc from "@/components/CustomIcon/Sidebar/ActiveIcon/IdeaManagementIconAc";
import IdeaManagementIcon from "@/components/CustomIcon/Sidebar/DeactiveIcon/IdeaManagementIcon";

// ---------- TYPES ----------
interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  activeIcon: React.ComponentType<{ className?: string }>;
}

interface SideBarMenuProps {
  isCollapsed: boolean;
  onMobileMenuClose: () => void;
}

// ---------- MENU DATA ----------
const sidebarMenu: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: DashboardIcon,
    activeIcon: DashboardIconAc,
  },
  {
    title: "User Management",
    href: "/user-management",
    icon: UserManagementIcon,
    activeIcon: UserManagementIconAC,
  },
  {
    title: "Comic Management",
    href: "/comic-management",
    icon: ComicManagementIcon,
    activeIcon: ComicManagementIconAc,
  },
  {
    title: "Idea Management",
    href: "/idea-management",
    icon: IdeaManagementIcon,
    activeIcon: IdeaManagementIconAc,
  },
];

// ---------- COMPONENT ----------
const SideBarMenu: React.FC<SideBarMenuProps> = ({
  isCollapsed,
  onMobileMenuClose,
}) => {
  const pathname = usePathname();

  const handleMobileClose = () => {
    if (window.innerWidth < 768) onMobileMenuClose();
  };

  return (
    <nav className={`px-4 space-y-5 ${isCollapsed ? "px-2" : ""}`}>
      {sidebarMenu.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleMobileClose}
            title={isCollapsed ? item.title : ""}
            className={`
              flex items-center p-3 rounded-lg transition-all duration-300
              ${isCollapsed ? "justify-center px-0" : "px-3 gap-3"}
              ${
                isActive
                  ? "bg-[#5B9BF4] text-white"
                  : "text-[#444950] hover:bg-[#1141CB1A]/40"
              }
            `}
          >
            <Icon
              className={`w-5 h-5 shrink-0 ${
                isActive ? "text-[#1E90FF]" : "text-gray-500"
              }`}
            />

            {!isCollapsed && (
              <span
                className={`transition-all whitespace-nowrap ${
                  isActive ? "font-medium" : ""
                }`}
              >
                {item.title}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default SideBarMenu;
