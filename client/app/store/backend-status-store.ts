import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type BackendStatus = "idle" | "checking" | "ready" | "failed";

type BackendStatusState = {
  status: BackendStatus;
  hasChecked: boolean;
  lastCheckedAt: number | null;

  setStatus: (status: BackendStatus) => void;
  setHasChecked: (value: boolean) => void;
  setLastCheckedAt: (time: number | null) => void;
  reset: () => void;
};

export const useBackendStatusStore = create<BackendStatusState>()(
  persist(
    (set) => ({
      status: "idle",
      hasChecked: false,
      lastCheckedAt: null,

      setStatus: (status) => set({ status }),
      setHasChecked: (value) => set({ hasChecked: value }),
      setLastCheckedAt: (time) => set({ lastCheckedAt: time }),

      reset: () =>
        set({
          status: "idle",
          hasChecked: false,
          lastCheckedAt: null,
        }),
    }),
    {
      name: "backend-status",
      storage: createJSONStorage(() => sessionStorage),

      // Persist only check history, not temporary UI status
      partialize: (state) => ({
        hasChecked: state.hasChecked,
        lastCheckedAt: state.lastCheckedAt,
      }),
    }
  )
);
