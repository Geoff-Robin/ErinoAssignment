import { clsx } from "clsx";
import axios from "axios";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_DEV_API_URL || '',
  withCredentials: true
})

export const checkAuth = async () => {
  try {
    const res = await api.get("/api/auth/me");
    return { ok: true, user: res.data };
  } catch {
    return { ok: false, user: null };
  }
};


