import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "../../types/user.t";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;

  setAuthChecked: (value: boolean) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAuthChecked: false,

      setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),

      logout: () =>
        set({ user: null, isAuthenticated: false, isAuthChecked: true }),

      setAuthChecked: (value) =>
        set({
          isAuthChecked: value,
        }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
