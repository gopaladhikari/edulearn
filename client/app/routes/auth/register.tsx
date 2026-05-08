import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Link,
  useNavigation,
  useSubmit,
  type ActionFunction,
} from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { registerSchema, type RegisterSchema } from "~/schemas/user.schema";

export function meta() {
  return [
    { title: "Register - Edulearn" },
    { name: "description", content: "Register to your account" },
  ];
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  console.log(formData);

  return null;
};

export default function Register() {
  const [showPassword, setShowPassword] = useState(true);

  const navigation = useNavigation();

  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    submit(data);
  };

  const isLoading = navigation.state === "submitting";

  return (
    <div className="w-full max-w-md">
      <Card className="p-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Create account
        </h1>
        <p className="mb-8 text-muted-foreground">
          Join thousands of students learning with Edulearn
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-foreground"
            >
              username
            </label>
            <Input
              id="username"
              aria-invalid={errors.username ? "true" : "false"}
              type="text"
              placeholder="edulearn"
              className="w-full"
              {...register("username")}
            />
          </div>

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
              placeholder="edulearn@example.com"
              className="w-full"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
            />
          </div>

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
                placeholder="Enter a strong password"
                className="w-full pr-10"
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
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-2 text-muted-foreground">
              Already have an account?
            </span>
          </div>
        </div>

        {/* Sign In Link */}
        <Link to="/login" className="block w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary/5"
          >
            Sign in
          </Button>
        </Link>
      </Card>
    </div>
  );
}
