import { Link } from "react-router";

import { buttonVariants } from "../ui/button";
import { cn } from "~/lib/utils";
import { publicNav } from "~/config/navigation";

interface AuthNavProps {
  redirectTo: string;
}

export function AuthNav({ redirectTo }: AuthNavProps) {
  return (
    <div className="flex items-center gap-8">
      {/* Public Navigation */}
      <ul className="hidden items-center gap-6 md:flex">
        {publicNav.header.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth Actions */}
      <div className="hidden items-center gap-3 md:flex">
        <Link
          to={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          Log in
        </Link>

        <Link
          to={`/register?redirectTo=${encodeURIComponent(redirectTo)}`}
          className={cn(buttonVariants())}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
