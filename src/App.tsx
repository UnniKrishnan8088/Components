import React from "react";
import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./components/DashboardLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "/home", element: <Box>Home</Box> },
        { path: "/dashboard", element: <Box>Dashboard</Box> },
        { path: "/about", element: <Box>About</Box> },
        { path: "/users", element: <Box>Users</Box> },
        { path: "/profile", element: <Box>Profile</Box> },
        { path: "/notifications", element: <Box>Notifications</Box> },
        { path: "/billing", element: <Box>Billing</Box> },
        { path: "/calendar", element: <Box>Calendar</Box> },
        { path: "/logs", element: <Box>Logs</Box> },

        {
          path: "/settings/general",
          element: <Box>General</Box>,
        },
        {
          path: "/settings/account",
          element: <Box>Accounts</Box>,
        },

        {
          path: "/messages/inbox",
          element: <Box>Inbox</Box>,
        },
        {
          path: "/messages/sent",
          element: <Box>Sent</Box>,
        },

        {
          path: "/analytics/overview",
          element: <Box>Overview</Box>,
        },
        {
          path: "/analytics/reports",
          element: <Box>Reports</Box>,
        },

        {
          path: "/projects/active",
          element: <Box>Active Projects</Box>,
        },
        {
          path: "/projects/completed",
          element: <Box>Completed Projects</Box>,
        },

        {
          path: "/support/contact",
          element: <Box>Contact Support</Box>,
        },
        {
          path: "/support/faq",
          element: <Box>FAQ</Box>,
        },
      ],
    },
  ]);
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
