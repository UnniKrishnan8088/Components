/**
 * @author Unni Krishnan
 *
 * MainContentArea component serves as the main content area of the application.
 * It renders the outlet for nested routes and a header for the drawer.
 *
 * @returns {JSX.Element} The rendered main content area with nested routes.
 */

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DrawerHeader } from "../../styles";
import Breadcrumbs from "../../../Breadcrumbs";

type MainContentAreaProps = {};

export default function MainContentArea({}: MainContentAreaProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 2,
        background: (theme) => theme.palette.primary.light,
        miHeight: "100dvh",
      }}
    >
      <DrawerHeader />
      <Breadcrumbs />
      <Outlet />
    </Box>
  );
}
