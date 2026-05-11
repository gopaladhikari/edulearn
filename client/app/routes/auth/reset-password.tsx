import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  useActionData,
  useNavigation,
  type ActionFunction,
  Link,
  useSubmit,
} from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "~/schemas/user.schema";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { getPasswordRequirements } from "~/lib/utils";

export function meta() {
  return [
    { title: "Reset Password - Edulearn" },
    { name: "description", content: "Reset password" },
  ];
}

export const clientAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  console.log(formData);

  return true;
};

export default function ResetPassword() {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLoading = navigation.state === "submitting";

  const submit = useSubmit();

  const isSubmitSuccessful = useActionData<boolean>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    submit(data);
  };

  const password = watch("newPassword");

  const passwordRequirements = getPasswordRequirements(password);

  return (
    <div className="w-full max-w-md">
      <Card className="p-8">
        {!isSubmitSuccessful ? (
          <>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Reset password
            </h1>
            <p className="mb-8 text-muted-foreground">
              Enter your new password below
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Password Field */}
              <FieldGroup className="space-y-6">
                {/* Password Field */}
                <Field>
                  <FieldLabel htmlFor="reset-password">New password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="reset-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...register("newPassword")}
                      aria-invalid={!!errors.newPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.newPassword.message}
                    </p>
                  )}

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
                  </div>
                </Field>

                {/* Confirm Password Field */}
                <Field>
                  <FieldLabel htmlFor="reset-confirmPassword">
                    Confirm password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="reset-confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      {...register("confirmPassword")}
                      aria-invalid={!!errors.confirmPassword}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </Field>

                {/* Reset Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset password"}
                </Button>
              </FieldGroup>
            </form>
          </>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
              Password reset successful
            </h1>
            <p className="mb-8 text-center text-muted-foreground">
              Your password has been successfully reset. You can now log in with
              your new password.
            </p>

            {/* Back to Login */}
            <Link to="/login" className="block">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Return to login
              </Button>
            </Link>
          </>
        )}
      </Card>
    </div>
  );
}
