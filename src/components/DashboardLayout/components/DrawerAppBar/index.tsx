import { AppBar } from "../../styles";
import { Toolbar } from "@mui/material";
import MobileDrawer from "../MobileDrawer";

type DrawerAppBarProps = {
  open: boolean;
  handleDrawerOpen: () => void;
  isMobileView: boolean;
};

export default function DrawerAppBar({
  isMobileView,
  open,
}: DrawerAppBarProps) {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>{!isMobileView && <MobileDrawer />}</Toolbar>
    </AppBar>
  );
}
