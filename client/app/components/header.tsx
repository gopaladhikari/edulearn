import { Link, useLocation } from "react-router";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";
import { useIsAuthenticated, useUser } from "~/store/userStore";
import {
  BadgeCheckIcon,
  Bell,
  BellIcon,
  CreditCardIcon,
  Heart,
  LogOutIcon,
  ShoppingCart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

function UserNav({ user }: { user: User }) {
  return (
    <div className="flex gap-8">
      <menu className="flex items-center gap-8">
        <Link to="/wishlist" title="Wishlist">
          <Heart size={18} />
          <span className="sr-only">Wishlist</span>
        </Link>

        <Link to="/cart" title="Cart">
          <ShoppingCart size={18} />
          <span className="sr-only">Cart</span>
        </Link>

        <Link to="/notification" title="Notifications">
          <Bell size={18} />
          <span className="sr-only">Notifications</span>
        </Link>
      </menu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>
                {" "}
                {user.username[0].toUpperCase()}{" "}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheckIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function AuthNav({ redirectTo }: { redirectTo: string }) {
  return (
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
  );
}

export function Header() {
  const location = useLocation();

  const redirectTo = location.pathname;

  const user = useUser();
  const isAuthenticated = useIsAuthenticated();

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

        {isAuthenticated ? (
          <UserNav user={user!} />
        ) : (
          <AuthNav redirectTo={redirectTo} />
        )}
      </nav>
    </header>
  );
}
