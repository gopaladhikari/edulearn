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
} from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "~/schemas/user.schema";

export function meta() {
  return [
    { title: "Reset Password - Edulearn" },
    { name: "description", content: "Reset password" },
  ];
}

export const action: ActionFunction = async ({ request }) => {
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
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    submit(data);
  };

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
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  New password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a strong password"
                    className="w-full pr-10"
                    aria-invalid={errors.newPassword ? "true" : "false"}
                    {...register("newPassword")}
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
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-foreground"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset password"}
              </Button>
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
