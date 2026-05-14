import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  useActionData,
  useNavigation,
  type ActionFunction,
  Link,
  useSubmit,
  Form,
} from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "~/schemas/user.schema";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";
import { PasswordRequirement } from "./components/password-requirement";
import { handleActionError } from "~/lib/utils";
import { api } from "~/lib/axios";

export function meta() {
  return [
    { title: "Reset Password - Edulearn" },
    { name: "description", content: "Reset password" },
  ];
}

export const clientAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const token = params?.token;

  if (!token) throw new Error("Token not found");

  try {
    const response = await api.post(
      `/api/v1/user/reset-password/${token}`,
      Object.fromEntries(formData)
    );

    return response.data;
  } catch (error) {
    return handleActionError(error);
  }
};

export default function ResetPassword() {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLoading = navigation.state === "submitting";

  const submit = useSubmit();

  const actionData = useActionData<ApiError | ApiSuccess>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    submit(data, { method: "post" });
  };

  const password = watch("newPassword");

  return (
    <div className="w-full max-w-md">
      <Card className="p-8">
        {!actionData?.success ? (
          <>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Reset password
            </h1>
            <p className="mb-8 text-muted-foreground">
              Enter your new password below
            </p>

            <Form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Password Field */}
              <FieldGroup>
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

                  <PasswordRequirement password={password} />
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
            </Form>
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
