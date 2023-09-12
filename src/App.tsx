import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/AuthProvider";
import Home from "./components/Home";
import { Box, CssBaseline } from "@mui/material";
import Login from "./components/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/register" element={<Register />} /> */}
          </Routes>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
};

export default App;
