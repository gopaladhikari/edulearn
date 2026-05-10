import { Link, useLocation } from "react-router";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";
import { useUserStore } from "~/store/userStore";
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

import type { User } from "../../types/user.t";
import { Skeleton } from "./ui/skeleton";
import { Logo } from "./logo";

function UserNav({ user, logout }: { user: User; logout: () => void }) {
  return (
    <div className="flex gap-8">
      <menu className="flex items-center gap-8">
        <Link to="/teaching">Teach on EduLearn</Link>
        <Link to="/wishlist" title="Wishlist">
          <Heart size={18} />
          <span className="sr-only">Wishlist</span>
        </Link>
        <Link to="/cart" title="Cart">
          <ShoppingCart size={18} />
          <span className="sr-only">Cart</span>
        </Link>
        <Link to="/notifications" title="Notifications">
          <Bell size={18} />
          <span className="sr-only">Notifications</span>
        </Link>
      </menu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="/default-avatar.svg" alt="shadcn" />
              <AvatarFallback>{user.username[0].toUpperCase()} </AvatarFallback>
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
          <DropdownMenuItem onClick={logout}>
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

  const { isAuthenticated, user, logout, isAuthChecked } = useUserStore();

  return (
    <header className="h-20 border-b border-border bg-card">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        {isAuthChecked === false ? (
          <div className="flex w-full max-w-45 flex-col gap-2">
            <Skeleton className="h-2 w-full bg-gray-400" />
            <Skeleton className="h-2 w-full bg-gray-400" />
          </div>
        ) : (
          <>
            {isAuthenticated ? (
              <UserNav user={user!} logout={logout} />
            ) : (
              <AuthNav redirectTo={redirectTo} />
            )}
          </>
        )}
      </nav>
    </header>
  );
}
