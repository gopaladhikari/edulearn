import axios from "axios";

const api = axios.create({
  withCredentials: true,
  timeout: 5000, // 5 seconds
  timeoutErrorMessage: "Request timed out",
});

export { api };
