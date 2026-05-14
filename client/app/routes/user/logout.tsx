import { type ActionFunction } from "react-router";
import { api } from "~/lib/axios";
import { handleActionError } from "~/lib/utils";
import { useUserStore } from "~/store/userStore";

export const clientAction: ActionFunction = async () => {
  try {
    const result = await api.post("/api/v1/user/logout");

    useUserStore.getState().logout();

    return result.data;
  } catch (error) {
    return handleActionError(error);
  }
};
