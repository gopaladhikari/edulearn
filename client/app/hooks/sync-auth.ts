import { useEffect, useEffectEvent, useRef } from "react";
import { getCurrentUser } from "~/lib/get-current-user";
import { useUserStore } from "~/store/userStore";

export function useAuthSync() {
  const setAuthChecked = useUserStore((state) => state.setAuthChecked);
  const logout = useUserStore((state) => state.logout);

  const hasRun = useRef(false);

  const authEvent = useEffectEvent(async () => {
    try {
      await getCurrentUser();
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
