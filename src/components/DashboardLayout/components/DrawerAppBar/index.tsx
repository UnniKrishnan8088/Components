/**
 * @author Unni Krishnan
 *
 * DrawerAppBar component serves as the top navigation bar for the application.
 * It conditionally renders a MobileDrawer based on whether the view is mobile.
 *
 * @param {DrawerAppBarProps} props - The props for the component.
 * @returns {JSX.Element} The rendered AppBar containing the Toolbar and
 */

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
