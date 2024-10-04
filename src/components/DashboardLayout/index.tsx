/**
 * @author Unni Krishnan
 *
 */
import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import DrawerAppBar from "./components/DrawerAppBar";
import SidebarMenuDrawer from "./components/SidebarMenuDrawer";
import MainContentArea from "./components/MainContentArea";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = React.useState(true);
  const [screenWidth, setScreenWidth] = React.useState<number>(
    window.innerWidth
  );

  const isMobileView = screenWidth >= 600;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerAppBar
        isMobileView={isMobileView}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      {isMobileView && (
        <SidebarMenuDrawer
          handleDrawerClose={() => setOpen(!open)}
          open={open}
        />
      )}
      <MainContentArea>{children}</MainContentArea>
    </Box>
  );
}
