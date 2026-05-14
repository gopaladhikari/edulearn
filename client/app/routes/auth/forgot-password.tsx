import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigation,
  type ActionFunction,
  useSubmit,
  Form,
} from "react-router";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "~/schemas/user.schema";
import { api } from "~/lib/axios";
import { handleActionError } from "~/lib/utils";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";

export function meta() {
  return [
    { title: "Forgot Password - Edulearn" },
    { name: "description", content: "Forgot password" },
  ];
}

export const clientAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const response = await api.post(
      "/api/v1/user/forgot-password",
      Object.fromEntries(formData)
    );

    return response.data;
  } catch (error) {
    return handleActionError(error);
  }
};

export default function ForgotPassword() {
  const navigator = useNavigation();

  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const actionData = useActionData<ApiError | ApiSuccess>();

  console.log({ actionData });

  const isSubmitting = navigator.state === "submitting";

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = (data) => {
    submit(data, { method: "post" });
  };

  return (
    <div className="w-full max-w-md">
      <Card className="p-8">
        {!actionData?.success ? (
          <>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Forgot password?
            </h1>
            <p className="mb-8 text-muted-foreground">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </p>

            <Form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Email Field */}
                <Field>
                  <FieldLabel htmlFor="forgot-email">Email address</FieldLabel>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </Field>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send reset link"}
                </Button>
              </FieldGroup>
              {/* Submit Button */}
            </Form>

            {/* Back to Login */}
            <div className="mt-6">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
              Check your email
            </h1>
            <p className="mb-8 text-center text-muted-foreground">
              We&apos;ve sent a password reset link to{" "}
              <span className="font-semibold text-foreground">your email.</span>
            </p>

            <p className="mb-8 text-center text-sm text-muted-foreground">
              Follow the link in the email to reset your password. The link will
              expire in 20 minutes.
            </p>

            {/* Back to Login */}
            <Link to="/login" className="block">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Back to login
              </Button>
            </Link>

            {/* Resend Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive an email?{" "}
                <button className="text-primary hover:underline">
                  Try again
                </button>
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
