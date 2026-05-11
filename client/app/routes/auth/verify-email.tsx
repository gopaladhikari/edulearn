import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Verify Email - Edulearn" },
    { name: "description", content: "Verify email" },
  ];
}

export default function VerifyEmail() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

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
              The verification link has expired or is invalid. Please request a
              new verification email.
            </p>

            {/* Retry Button */}
            <Button
              onClick={() => setStatus("verifying")}
              className="mb-3 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Try again
            </Button>

            {/* Back to Login */}
            <Link to="/login" className="block">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/5"
              >
                Back to login
              </Button>
            </Link>
          </>
        )}
      </Card>
    </div>
  );
}
