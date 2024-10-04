/**
 * @author Unni Krishnan
 * DashboardLayout component is the main layout structure for the application.
 * It includes a responsive AppBar and a Sidebar Drawer that adapts to different
 * screen sizes, making it optimized for both mobile and desktop views.
 *
 */
import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import DrawerAppBar from "./components/DrawerAppBar";
import SidebarMenuDrawer from "./components/SidebarMenuDrawer";
import MainContentArea from "./components/MainContentArea";

type DashboardLayoutProps = {};

export default function DashboardLayout({}: DashboardLayoutProps) {
  const [open, setOpen] = React.useState(true);
  const [screenWidth, setScreenWidth] = React.useState<number>(
    window.innerWidth
  );

  const isMobileView = screenWidth >= 600;

  // Function to open the drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Function to update the screen width state on window resize
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
      {/* Main content area */}
      <MainContentArea />
    </Box>
  );
}
