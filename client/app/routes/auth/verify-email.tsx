import { Button, buttonVariants } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  data,
  Form,
  Link,
  useFetcher,
  useLoaderData,
  type ActionFunction,
  type LoaderFunction,
} from "react-router";
import { api } from "~/lib/axios";
import { cn, handleActionError } from "~/lib/utils";
import type { ApiError, ApiSuccess } from "../../../types/axios.t";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Field, FieldGroup } from "~/components/ui/field";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resendEmailVerificationSchema,
  type ResendEmailVerificationSchema,
} from "~/schemas/user.schema";

export function meta() {
  return [{ title: "Verify Email - Edulearn" }];
}

export const clientLoader: LoaderFunction = async ({ params }) => {
  const token = params?.token;

  if (!token)
    return data(
      {
        success: false,
        message: "Invalid token",
      },
      {
        status: 400,
      }
    );

  try {
    const result = await api.post(`/api/v1/user/verify-email/${token}`);

    return data(result.data, {
      status: result.status,
    });
  } catch (error) {
    return handleActionError(error);
  }
};

export const clientAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  try {
    const result = await api.post(
      `/api/v1/user/resend-email-verification`,
      Object.fromEntries(formData)
    );

    return data(result.data, {
      status: result.status,
    });
  } catch (error) {
    return handleActionError(error);
  }
};

export default function VerifyEmail() {
  const [showModal, setShowModal] = useState(false);

  const fetcher = useFetcher<ApiSuccess | ApiError>();

  const loaderData = useLoaderData<ApiSuccess | ApiError>();

  const isSubmitting = fetcher.state === "submitting";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resendEmailVerificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ResendEmailVerificationSchema> = (values) => {
    fetcher.submit(values, {
      method: "POST",
    });
  };

  const status = loaderData?.success
    ? "success"
    : loaderData?.message
      ? "error"
      : "verifying";

  return (
    <div className="w-full max-w-md">
      <Card className="p-8">
        {status === "verifying" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-border border-t-primary"></div>
              </div>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
              Verifying email
            </h1>
            <p className="text-center text-muted-foreground">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
              Email verified
            </h1>
            <p className="mb-8 text-center text-muted-foreground">
              Your email address has been successfully verified. You can now
              access all features.
            </p>

            {/* Continue Button */}
            <Link to="/login" className="block">
              <Button className="mb-3 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Continue to login
              </Button>
            </Link>

            {/* Back Home */}
            <Link to="/" className="block">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/5"
              >
                Back to home
              </Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
              Verification failed
            </h1>
            <p className="mb-8 text-center text-muted-foreground">
              {loaderData?.message ||
                "The verification link has expired or is invalid. Please request a new verification email."}
            </p>

            {/* Retry Button */}

            <Dialog open={showModal} onOpenChange={setShowModal}>
              <Form method="post">
                <DialogTrigger asChild>
                  <Button className="mb-3 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Try again
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Resend verification email.</DialogTitle>
                    <DialogDescription>
                      Enter your email address to receive a new verification
                      email.
                    </DialogDescription>
                  </DialogHeader>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="Your email"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                      {fetcher.data?.success ? (
                        <p className="text-green-700">{fetcher.data.message}</p>
                      ) : (
                        <p className="text-sm text-destructive">
                          {fetcher.data?.message}
                        </p>
                      )}
                    </Field>
                  </FieldGroup>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSubmit(onSubmit)}
                    >
                      {isSubmitting ? "Sending..." : "Try again"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Form>
            </Dialog>

            {/* Back to Login */}
            <Link
              to="/login"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full border-primary text-primary hover:bg-primary/5"
              )}
            >
              Back to login
            </Link>
          </>
        )}
      </Card>
    </div>
  );
}
