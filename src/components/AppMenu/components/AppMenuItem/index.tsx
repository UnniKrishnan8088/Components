/**
 * @author Unni Krishnan
 *
 * AppMenuItem component represents an individual item in the sidebar menu.
 * It handles the display of menu items, including the ability to toggle submenus
 * and navigate to different routes. The component also highlights active items based
 * on the current route.
 *
 */

import React from "react";
import { MenuItem } from "../..";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Tooltip,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocation, useNavigate } from "react-router-dom";
import AppSubmenu from "../AppSubmenu";

type AppMenuItemProps = {
  item: MenuItem;
  openMenuIds: number[]; // Array of IDs for currently open submenus
  handleToggle: (id: number) => void;
  activeParentId: number | null; // Add activeParentId prop
  setActiveParentId: (id: number) => void; // Add setActiveParentId prop
  isDrawerOpen: boolean;
};

export default function AppMenuItem({
  activeParentId,
  handleToggle,
  isDrawerOpen,
  item,
  openMenuIds,
  setActiveParentId,
}: AppMenuItemProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = openMenuIds?.includes(item.id);
  const hasSubmenu = item?.submenu && item?.submenu?.length !== 0;

  const handleClick = (item: MenuItem) => {
    if (isDrawerOpen) {
      if (item?.submenu) {
        handleToggle(item.id); // Toggle submenu
      } else if (item?.path) {
        navigate(item.path); // Navigate to the path if no submenu
      }
    } else {
      if (item?.path) {
        navigate(item.path); // Navigate to the path if no submenu
      }
    }
  };

  // Function to check if the current item or any submenu is active
  const isActive = (menuItem: MenuItem): boolean => {
    if (location.pathname === menuItem.path) {
      return true; // Active item
    }
    if (menuItem.submenu && menuItem?.submenu?.length > 0) {
      return menuItem.submenu.some(isActive); // Check if any submenu is active
    }
    return false;
  };

  const active = isActive(item); // Is this item or any of its submenus active
  const parentActive = activeParentId === item.id || active; // Parent or submenu active

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Click handler for the menu icon
  const handleClickMenuIcon = (event: React.MouseEvent<HTMLElement>) => {
    if (isDrawerOpen) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  // Close the submenu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment key={item.id}>
      <ListItem
        sx={{
          background: (theme) =>
            parentActive && item?.parent ? `${theme.palette.primary.main}` : "",
          borderRadius: "4px",
        }}
        disablePadding
      >
        <ListItemButton
          sx={{
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
          onClick={() => handleClick(item)}
        >
          <Tooltip title={!isDrawerOpen ? item?.title : ""} placement="left">
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: active ? "white" : "text.secondary",
              }}
              {...(!isDrawerOpen &&
                item?.submenu &&
                item?.submenu?.length > 0 && { onClick: handleClickMenuIcon })}
            >
              {item.icon}
            </ListItemIcon>
          </Tooltip>
          {/* submenu for closed sidebar */}
          <AppSubmenu
            anchorEl={anchorEl}
            handleClose={handleClose}
            item={item ?? []}
            open={open}
          />
          <ListItemText
            sx={[
              {
                "& .MuiListItemText-primary": {
                  fontSize: "13px",
                  color: active
                    ? hasSubmenu // If it's a parent with a submenu
                      ? "white" // Parent items (with submenu) active: white
                      : !item?.parent // Submenu active: red
                        ? "primary.main"
                        : "white" // Active standalone items: white
                    : "text.secondary", // Inactive items: black
                },

                flex: 1,
                display: isDrawerOpen ? "block" : "none",
              },
              isDrawerOpen
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                  },
            ]}
            primary={item.title}
          />
          {item?.submenu && (
            <ListItemIcon
              sx={{
                minWidth: 0,
                ...(!isDrawerOpen && { display: "none" }),
                color: active ? "white" : "text.secondary",
                opacity: isDrawerOpen ? 1 : 0,
              }}
            >
              {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </ListItemIcon>
          )}
        </ListItemButton>
      </ListItem>
      {/* Render the submenus */}
      {isDrawerOpen && hasSubmenu && (
        <Collapse in={openMenuIds.includes(item.id)}>
          <List disablePadding>
            {item?.submenu?.map((submenu) => (
              <AppMenuItem
                key={submenu.id}
                item={submenu}
                openMenuIds={openMenuIds}
                handleToggle={handleToggle}
                activeParentId={activeParentId} // Pass activeParentId
                setActiveParentId={setActiveParentId} // Pass setActiveParentId
                isDrawerOpen={isDrawerOpen}
              />
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );
}
