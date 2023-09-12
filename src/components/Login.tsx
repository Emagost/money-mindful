import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
  const { loginWithGoogle, logout } = useAuth();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    loginWithGoogle();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
