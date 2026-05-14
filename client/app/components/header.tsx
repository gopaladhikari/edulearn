import { Link, useLocation } from "react-router";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";
import { useUserStore } from "~/store/userStore";
import { Bell, Heart, LogOutIcon, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useFetcher } from "react-router";

import type { User } from "../../types/user.t";
import { Skeleton } from "./ui/skeleton";
import { Logo } from "./logo";
import type { ApiError, ApiSuccess } from "../../types/axios.t";

function UserNav({ user }: { user: User }) {
  const logoutFetcher = useFetcher<ApiSuccess | ApiError>();

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
              <AvatarImage
                src="/default-avatar.svg"
                alt={`${user.username}'s avatar`}
              />
              <AvatarFallback>{user.username[0].toUpperCase()} </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-50">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link to="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/cart" className="w-full">
                My Cart
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/wishlist" className="w-full">
                My Wishlist
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link to="/settings" className="w-full">
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/payment-settings" className="w-full">
                Payment Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/subscription" className="w-full">
                Subscription
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/purchase-history" className="w-full">
                Purchase History
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <logoutFetcher.Form
              method="POST"
              action="/logout"
              className="w-full"
            >
              <Button type="submit" className="w-full" variant="destructive">
                Logout
                <LogOutIcon />
              </Button>
            </logoutFetcher.Form>
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

  const isAuthChecked = useUserStore((state) => state.isAuthChecked);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

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
              <UserNav user={user!} />
            ) : (
              <AuthNav redirectTo={redirectTo} />
            )}
          </>
        )}
      </nav>
    </header>
  );
}
