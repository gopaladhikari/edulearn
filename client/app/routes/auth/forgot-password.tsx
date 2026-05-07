import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export function meta() {
  return [
    { title: "Forgot Password - Edulearn" },
    { name: "description", content: "Forgot password" },
  ];
}

export default function ForgotPassword() {
  const isSubmitted = false;
  const isLoading = false;

  return (
    <div className="w-full max-w-md">
      <Card className="p-8">
        {!isSubmitted ? (
          <>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Forgot password?
            </h1>
            <p className="mb-8 text-muted-foreground">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </p>

            <form className="space-y-4">
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
                  placeholder="you@example.com"
                  className="w-full"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
            </form>

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
              <span className="font-semibold text-foreground">email</span>
            </p>

            <p className="mb-8 text-center text-sm text-muted-foreground">
              Follow the link in the email to reset your password. The link will
              expire in 1 hour.
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
