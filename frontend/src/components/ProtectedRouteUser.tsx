import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export function ProtectedRouteUser({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isAdmin } = useAuthContext();

  if (!isAuthenticated && isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
