import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export function ProtectedRoute({ children }: { children: any }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
