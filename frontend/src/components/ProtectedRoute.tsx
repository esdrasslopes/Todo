import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
