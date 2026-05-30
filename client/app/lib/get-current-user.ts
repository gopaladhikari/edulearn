import { useUserStore } from "~/store/userStore";
import type { User } from "../../types/user.t";
import { api } from "./axios";

type Result = {
  user: User;
};

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get<Result>("/api/v1/user/current-user");
    useUserStore.getState().setUser(data.data.user);
    return data.data.user;
  } catch (error) {
    useUserStore.getState().logout();
  }
};
