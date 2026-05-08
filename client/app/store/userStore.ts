import { create } from "zustand";

export type AuthUser = {
  _id: string;
  id?: string;
  username: string;
  email: string;
  role: "student" | "instructor" | "admin";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (user: AuthUser, accessToken?: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (user, accessToken = null) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
    }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));
