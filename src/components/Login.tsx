import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const { loginWithGoogle, loading } = useAuth();

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const loginSuccess = await loginWithGoogle();

    if (loginSuccess) {
      navigate("/dashboard");
      setIsLoading(false);
    }
  };

  return (
    <Container component="main">
      {loading && isLoading ? (
        <CircularProgress
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
      ) : (
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
        </Box>
      )}
    </Container>
  );
};

export default Login;
