import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { useUserStore } from "~/store/userStore";

const baseURL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000, // 5 seconds
  timeoutErrorMessage: "Request timed out",
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;
    const requestUrl = originalRequest.url || "";

    const isAuthRoute =
      requestUrl.includes("/api/v1/user/login") ||
      requestUrl.includes("/api/v1/user/register") ||
      requestUrl.includes("/api/v1/user/refresh-token");

    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        await api.post("/api/v1/user/refresh-token");

        return api(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
