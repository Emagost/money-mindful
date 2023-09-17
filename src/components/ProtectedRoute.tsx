import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useAuth();
  console.log("user", user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
