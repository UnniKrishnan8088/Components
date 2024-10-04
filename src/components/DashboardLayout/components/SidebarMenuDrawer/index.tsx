/**
 * @author Unni Krishnan
 *
 * SidebarMenuDrawer component represents the sidebar navigation menu.
 * It displays the dashboard title, menu items, and a logout button.
 *
 * @param {SidebarMenuDrawerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered sidebar drawer with navigation options.
 */

import { Stack, IconButton, Typography, Divider } from "@mui/material";
import { Drawer, DrawerHeader } from "../../styles";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import AppMenu from "../../../AppMenu";
import LogoutButton from "../LogoutButton";

type SidebarMenuDrawerProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

export default function SidebarMenuDrawer({
  handleDrawerClose,
  open,
}: SidebarMenuDrawerProps) {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Stack width={"100%"}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                opacity: open ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              Dashboard
            </Typography>
          </Stack>
          <IconButton onClick={handleDrawerClose}>
            {open ? <MenuIcon color="error" /> : <MenuOpenIcon color="error" />}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider />
      {/* Render menu items */}
      <AppMenu isDrawerOpen={open} />
      <Divider />
      {/* Logout button */}
      <LogoutButton open={open} />
    </Drawer>
  );
}
