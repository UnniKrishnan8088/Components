import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { DrawerHeader } from "../../styles";

type MainContentAreaProps = {
  children?: React.ReactNode;
};

export default function MainContentArea({ children }: MainContentAreaProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 2,
        background: (theme) => theme.palette.primary.light,
        height: "100dvh",
      }}
    >
      <DrawerHeader />
      {children}
      <Outlet />
    </Box>
  );
}
