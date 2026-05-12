import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { data } from "react-router";
import { twMerge } from "tailwind-merge";
import { api } from "./axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleActionError(error: unknown) {
  if (isAxiosError(error)) {
    return data(
      {
        success: false,
        message:
          error.response?.data?.message || error.message || "Request failed.",
      },
      {
        status: error.response?.status || 500,
      }
    );
  }

  return data(
    {
      success: false,
      message: "Something went wrong. Please try again.",
    },
    {
      status: 500,
    }
  );
}

export const getPasswordRequirements = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
};
``;

type WaitForBackendOptions = {
  retries?: number;
  delayMs?: number;
  timeoutMs?: number;
  onAttempt?: (attempt: number, maxAttempts: number) => void;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function waitForBackendReady({
  retries = 8,
  delayMs = 4000,
  timeoutMs = 8000,
  onAttempt,
}: WaitForBackendOptions = {}) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      onAttempt?.(attempt, retries);

      await api.get("/health", {
        timeout: timeoutMs,
      });

      return true;
    } catch {
      if (attempt === retries) return false;

      await sleep(delayMs);
    }
  }

  return false;
}
