/**
 * @author Unni Krishnan
 *
 * AppMenu component displays a list of navigation menu items for the sidebar.
 * Each menu item can have submenus and icons associated with them.
 * This component handles the open/close state of submenus and maintains the active state of parent items.
 *
 * @param {AppMenuProps} props - The props for the component.
 * @param {boolean} props.isDrawerOpen - Indicates whether the sidebar drawer is open.
 * @returns {JSX.Element} The rendered list of menu items with submenus.
 */

import React from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { List, Stack } from "@mui/material";
import AppMenuItem from "./components/AppMenuItem";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import HelpIcon from "@mui/icons-material/Help";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderIcon from "@mui/icons-material/Folder";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";

type AppMenuProps = {
  isDrawerOpen: boolean;
};

export type MenuItem = {
  id: number;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  submenu?: MenuItem[];
  parent?: boolean;
};

const ListItems: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    parent: true,
    icon: <HomeIcon fontSize="small" />,
    submenu: [
      {
        id: 1001,
        title: "Sub Home ",
        path: "/home",
      },
      {
        id: 1002,
        title: "Sub Home 2",
        path: "/home/sub2",
      },
    ],
  },
  {
    id: 2,
    title: "Dashboard",
    parent: true,
    path: "/dashboard",
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    id: 3,
    title: "About",
    path: "/about",
    parent: true,
    icon: <LibraryBooksIcon fontSize="small" />,
  },
  {
    id: 4,
    title: "Users",
    path: "/users",
    parent: true,
    icon: <GroupIcon fontSize="small" />,
  },
  {
    id: 5,
    title: "Settings",
    parent: true,
    icon: <SettingsIcon fontSize="small" />,
    submenu: [
      {
        id: 5001,
        title: "General Settings",
        path: "/settings/general",
      },
      {
        id: 5002,
        title: "Account Settings",
        path: "/settings/account",
      },
    ],
  },
  {
    id: 6,
    title: "Profile",
    path: "/profile",
    parent: true,
    icon: <AccountCircleIcon fontSize="small" />,
  },
  {
    id: 7,
    title: "Messages",
    parent: true,
    icon: <MessageIcon fontSize="small" />,
    submenu: [
      {
        id: 7001,
        title: "Inbox",
        path: "/messages/inbox",
      },
      {
        id: 7002,
        title: "Sent",
        path: "/messages/sent",
      },
    ],
  },
  {
    id: 8,
    title: "Notifications",
    path: "/notifications",
    parent: true,
    icon: <CircleNotificationsIcon fontSize="small" />,
  },
  {
    id: 9,
    title: "Help",
    path: "/help",
    parent: true,
    icon: <HelpIcon fontSize="small" />,
  },
  {
    id: 10,
    title: "Analytics",
    parent: true,
    icon: <AnalyticsIcon fontSize="small" />,
    submenu: [
      {
        id: 10001,
        title: "Overview",
        path: "/analytics/overview",
      },
      {
        id: 10002,
        title: "Reports",
        path: "/analytics/reports",
      },
    ],
  },
  {
    id: 11,
    title: "Billing",
    path: "/billing",
    parent: true,
    icon: <PaymentIcon fontSize="small" />,
  },
  {
    id: 12,
    title: "Support",
    parent: true,
    icon: <PaymentIcon fontSize="small" />,
    submenu: [
      {
        id: 12001,
        title: "Contact Support",
        path: "/support/contact",
      },
      {
        id: 12002,
        title: "FAQ",
        path: "/support/faq",
      },
    ],
  },
  {
    id: 13,
    title: "Calendar",
    path: "/calendar",
    parent: true,
    icon: <CalendarTodayIcon fontSize="small" />,
  },
  {
    id: 14,
    title: "Projects",
    parent: true,
    icon: <FolderIcon fontSize="small" />,
    submenu: [
      {
        id: 14001,
        title: "Active Projects",
        path: "/projects/active",
      },
      {
        id: 14002,
        title: "Completed Projects",
        path: "/projects/completed",
      },
    ],
  },
  {
    id: 15,
    title: "Logs",
    path: "/logs",
    parent: true,
    icon: <HistoryIcon fontSize="small" />,
  },
];

export default function AppMenu({ isDrawerOpen }: AppMenuProps) {
  const [openMenuIds, setOpenMenuIds] = React.useState<number[]>([]);
  const [activeParentId, setActiveParentId] = React.useState<number | null>(
    null
  );

  const handleToggle = (id: number) => {
    setOpenMenuIds((prev) =>
      prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]
    );
  };

  return (
    <Stack
      sx={{
        height: "85dvh",
        overflowY: "scroll",
      }}
    >
      <List
        sx={{
          padding: 1,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {ListItems?.map((item) => (
          <AppMenuItem
            key={item.id}
            item={item}
            openMenuIds={openMenuIds}
            handleToggle={handleToggle}
            activeParentId={activeParentId} // Pass activeParentId
            setActiveParentId={setActiveParentId} // Pass setActiveParentId
            isDrawerOpen={isDrawerOpen}
          />
        ))}
      </List>
    </Stack>
  );
}
