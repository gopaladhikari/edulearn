import { useEffect, useEffectEvent, useRef } from "react";
import { useUserStore } from "~/store/userStore";
import { api } from "~/lib/axios";
import type { User } from "../../types/user.t";

type Result = {
  user: User;
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
    } catch {
      logout();
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
