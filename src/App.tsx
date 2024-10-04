import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./components/DashboardLayout";
import { Routes, Route, Outlet } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <DashboardLayout>
            <Routes>
              <Route path="/home" element={<h1>Home</h1>} />
              <Route path="/dashboard" element={<h1>Dashboard</h1>} />
              <Route path="/about" element={<h1>About</h1>} />
            </Routes>
          </DashboardLayout>
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
