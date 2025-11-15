import { useAuthContext } from "../contexts/AuthContext";
import { api } from "../lib/api";
import type { createUser, UserAuthenticate } from "../types";

interface UseAuthResponse {
  status: number;
  message?: string;
  isAdmin?: boolean;
}

export const useAuth = () => {
  const { setAuthenticated, setIsAdmin } = useAuthContext();

  const authenticateUser = async ({
    email,
    password,
  }: UserAuthenticate): Promise<UseAuthResponse> => {
    try {
      const response = await api.post("/user/auth", {
        email,
        password,
      });

      if (response.data.token) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      const userRole = await api.get("/users-level");

      if (userRole.data.userLevel.props.role === "ADMIN") {
        setIsAdmin(true);
      }

      const admin = userRole.data.userLevel.props.role === "ADMIN";

      setAuthenticated(true);

      return {
        status: response.status,
        isAdmin: admin,
      };
    } catch (error: any) {
      return { status: error.status, message: error.response.data };
    }
  };

  const registerUser = async ({
    email,
    groupId,
    name,
    password,
  }: createUser) => {
    try {
      const response = await api.post("/user", {
        email,
        groupId,
        name,
        password,
      });

      console.log(response);

      return {
        status: response.status,
      };
    } catch (error: any) {
      return { status: error.status, message: error.response.data };
    }
  };

  return { authenticateUser, registerUser };
};
