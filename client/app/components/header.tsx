import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const redirectTo = location.pathname;

  return (
    <header className="border-b border-border bg-card">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
            E
          </div>
          <span className="text-xl font-bold text-foreground">Edulearn</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/contact-us"
            className="text-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
          <Link
            to="/terms-and-conditions"
            className="text-foreground transition-colors hover:text-primary"
          >
            Terms
          </Link>
          <Link
            to="/privacy-policy"
            className="text-foreground transition-colors hover:text-primary"
          >
            Privacy
          </Link>
        </div>
        {/* Auth Buttons - Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to={`/login?redirectTo=${redirectTo}`}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Log in
          </Link>
          <Link to="/register" className={cn(buttonVariants())}>
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 hover:bg-muted"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="space-y-3 px-4 py-4">
            <Link
              to="/"
              className="block py-2 text-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/contact-us"
              className="block py-2 text-foreground transition-colors hover:text-primary"
            >
              Contact
            </Link>
            <Link
              to="/terms-and-conditions"
              className="block py-2 text-foreground transition-colors hover:text-primary"
            >
              Terms
            </Link>
            <Link
              to="/privacy-policy"
              className="block py-2 text-foreground transition-colors hover:text-primary"
            >
              Privacy
            </Link>
            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <Link to="/auth/login" className="w-full">
                Log in
              </Link>
              <Link to="/auth/register" className="w-full">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
