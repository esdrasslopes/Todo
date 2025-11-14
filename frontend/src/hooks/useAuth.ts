import { api } from "../lib/api";
import type { createUser, UserAuthenticate } from "../types";

interface UseAuthResponse {
  status: number;
  message?: string;
}

export const useAuth = () => {
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

      return {
        status: response.status,
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
      await api.post("/user", { email, groupId, name, password });
    } catch (error) {
      return error;
    }
  };

  return { authenticateUser, registerUser };
};
