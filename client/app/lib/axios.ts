import axios from "axios";

const baseURL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000, // 5 seconds
  timeoutErrorMessage: "Request timed out",
});

export { api };
