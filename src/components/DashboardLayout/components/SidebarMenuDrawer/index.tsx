import {
  Stack,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { Drawer, DrawerHeader } from "../../styles";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
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
      <AppMenu isDrawerOpen={open} />
      <Divider />
      <LogoutButton open={open} />
    </Drawer>
  );
}
