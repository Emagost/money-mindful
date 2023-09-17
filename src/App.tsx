import React, { useCallback, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthProvider";
import Dashboard from "./components/Dashboard";
import { Box, CssBaseline } from "@mui/material";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useStyles from "./styles";

const App = () => {
  const { classes } = useStyles();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useCallback(
    () => setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    []
  );

  const themeName = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={themeName}>
      <CssBaseline />
      <Box className={classes.appContainer}>
        <AuthProvider>
          <Sidebar changeTheme={colorMode} />
          <Routes>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
};

export default App;
//   {/* <Route path="/path_name/:dynamic" element={<Component_Name />} />
//   <Route path="/path_name" element={<Component_Name />} />
//   <Route path="users" element={<Users />}>
//   <Route path="me" element={<OwnUserProfile />} />
//   <Route path=":id" element={<UserProfile />} />
// </Route> */}
