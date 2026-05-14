import { Check, X } from "lucide-react";

type Props = {
  password: string;
};

export function PasswordRequirement({ password }: Props) {
  const passwordRequirements = {
    minLength: password?.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  return (
    <div>
      {" "}
      {/* Password Requirements */}
      <div className="mt-3 space-y-1 text-sm">
        <div className="flex items-center gap-2">
          {passwordRequirements.minLength ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-destructive" />
          )}
          <span
            className={
              passwordRequirements.minLength
                ? "text-green-600"
                : "text-muted-foreground"
            }
          >
            At least 8 characters
          </span>
        </div>
        <div className="flex items-center gap-2">
          {passwordRequirements.hasUppercase ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-destructive" />
          )}
          <span
            className={
              passwordRequirements.hasUppercase
                ? "text-green-600"
                : "text-muted-foreground"
            }
          >
            One uppercase letter
          </span>
        </div>
        <div className="flex items-center gap-2">
          {passwordRequirements.hasLowercase ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-destructive" />
          )}
          <span
            className={
              passwordRequirements.hasLowercase
                ? "text-green-600"
                : "text-muted-foreground"
            }
          >
            One lowercase letter
          </span>
        </div>
        <div className="flex items-center gap-2">
          {passwordRequirements.hasNumber ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-destructive" />
          )}
          <span
            className={
              passwordRequirements.hasNumber
                ? "text-green-600"
                : "text-muted-foreground"
            }
          >
            One number
          </span>
        </div>
      </div>{" "}
    </div>
  );
}
