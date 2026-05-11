import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { data } from "react-router";
import { twMerge } from "tailwind-merge";

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
