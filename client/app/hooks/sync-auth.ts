import { useEffect } from "react";
import { useUserStore } from "~/store/userStore";
import { isAxiosError } from "axios";
import { api } from "~/lib/axios";

export function useAuthSync() {
  const { setUser, setAuthChecked, logout } = useUserStore();

  useEffect(() => {
    const syncAuth = async () => {
      try {
        const { data } = await api.get("/api/v1/user/current-user");

        setUser(data.data.user);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          try {
            await api.post("/api/v1/user/refresh-token");

            const { data } = await api.get("/api/v1/user/current-user");

            setUser(data.data);
          } catch {
            logout();
          }
        } else {
          logout();
        }
      } finally {
        setAuthChecked(true);
      }
    };

    syncAuth();
  }, [setUser, setAuthChecked, logout]);
}
