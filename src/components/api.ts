import axios from "axios";

declare global {
  interface Window {
    RUNTIME_API_URL?: string;
  }
}

const apiUrl = window.RUNTIME_API_URL || "";

export const api = axios.create({
  baseURL: `${apiUrl}/api`
});
