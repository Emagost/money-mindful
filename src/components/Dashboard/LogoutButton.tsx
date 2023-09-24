import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
