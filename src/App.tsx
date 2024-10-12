import React from "react";
import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./components/DashboardLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Dashboard/pages/Products";
import ErrorBoundery from "./components/ErrorBoundery";
import AnimatedPage from "./GSAP/pages/AnimatedPage";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/home/products", element: <Products /> },
        { path: "/home/products/:id", element: <Box>Details</Box> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/dashboard/products", element: <Products /> },
        { path: "/dashboard/products/:id", element: <Box>Details</Box> },
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
      <ErrorBoundery fallback={"Loading...."}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {/* <RouterProvider router={router} /> */}
            <AnimatedPage />
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundery>
    </React.Fragment>
  );
}

export default App;
