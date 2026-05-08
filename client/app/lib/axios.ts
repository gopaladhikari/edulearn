import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  timeout: 5000, // 5 seconds
});

export { api };
