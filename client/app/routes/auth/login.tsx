import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  Link,
  type ActionFunction,
  useSubmit,
  useNavigation,
  useActionData,
  redirect,
  data,
} from "react-router";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginSchema } from "~/schemas/user.schema";
import { useState } from "react";
import { api } from "~/lib/axios";
import type { ApiError } from "../../../types/axios.t";
import { isAxiosError } from "axios";

export function meta() {
  return [
    { title: "Login - Edulearn" },
    { name: "description", content: "Login to your account" },
  ];
}

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/";

  try {
    const formData = await request.formData();

    await api.post("/user/login", formData);

    return redirect(redirectTo);
  } catch (error) {
    if (isAxiosError(error))
      return data(error.response?.data, {
        status: error.response?.status,
      });
    return data(error, {
      status: 500,
    });
  }
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigator = useNavigation();

  const actionData = useActionData<ApiError>();

  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const isSubmitting = navigator.state === "submitting";

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    submit(data, { method: "post" });
  };

  console.log(actionData);

  return (
    <div className="w-full max-w-md">
      <Card className="p-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Welcome back
        </h1>
        <p className="mb-8 text-muted-foreground">
          Sign in to your account to continue learning
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="you@example.com"
              {...register("email")}
            />
          </div>

          {errors.email?.message && (
            <p className="mt-1 text-sm text-destructive" id="email-error">
              {errors.email.message}
            </p>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password")}
              />

              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password?.message && (
              <p className="mt-1 text-sm text-destructive" id="password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {!actionData?.success && (
            <p className="mt-1 text-sm text-destructive" id="email-error">
              {actionData?.message}
            </p>
          )}

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-2 text-muted-foreground">
              Don&apos;t have an account?
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <Link to="/register" className="block w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary/5"
          >
            Create account
          </Button>
        </Link>
      </Card>

      {/* Footer Links */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          By signing in, you agree to our{" "}
          <Link
            to="/terms-and-conditions"
            className="text-primary hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
