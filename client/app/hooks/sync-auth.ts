import { useEffect, useEffectEvent } from "react";
import { isAxiosError } from "axios";
import { useUserStore } from "~/store/userStore";
import { api } from "~/lib/axios";
import type { User } from "../../types/user.t";

type Result = {
  user: User;
};

const refreshAccessToken = async () => {
  const response = await api.post("/api/v1/user/refresh-token");
  console.log("refresh token", response);
  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get<Result>("/api/v1/user/current-user");
  console.log("current user", response);
  return response.data.data.user;
};

// User logged in -> auth store, store is lost after closing browser
// User logged out -> clean auth store
// user refreshed page -> persistan handles it

// user unauthorized.
// Refresh token
// set user
//  if not clean the store

export function useAuthSync() {
  const { setUser, logout, setAuthChecked } = useUserStore();

  const authEvent = useEffectEvent(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        try {
          console.log(error.response.data);
          await refreshAccessToken();

          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch {
          logout();
        }
      } else {
        logout();
      }
    } finally {
      setAuthChecked(true);
    }
  });

  useEffect(() => {
    authEvent();
  }, []);
}
