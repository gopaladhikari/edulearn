import { useEffect, useEffectEvent, useRef } from "react";
import { isAxiosError } from "axios";
import { useUserStore } from "~/store/userStore";
import { api } from "~/lib/axios";
import type { User } from "../../types/user.t";

type Result = {
  user: User;
};

const refreshAccessToken = async () => {
  const response = await api.post("/api/v1/user/refresh-token");
  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get<Result>("/api/v1/user/current-user");
  return response.data.data.user;
};

export function useAuthSync() {
  const { setUser, logout, setAuthChecked } = useUserStore();

  const hasRun = useRef(false);

  const authEvent = useEffectEvent(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        try {
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
    if (hasRun.current) return;

    hasRun.current = true;

    authEvent();
  }, []);
}
