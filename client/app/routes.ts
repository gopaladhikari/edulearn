import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("routes/auth/layout.tsx", [
    route("/login", "routes/auth/login.tsx"),
    route("/register", "routes/auth/register.tsx"),
    route("/forgot-password", "routes/auth/forgot-password.tsx"),
    route("/reset-password/:token", "routes/auth/reset-password.tsx"),
    route("/verify-email/:token", "routes/auth/verify-email.tsx"),
  ]),

  layout("routes/user/layout.tsx", [
    route("/profile", "routes/user/profile.tsx"),
    route("/wishlist", "routes/user/wishlist.tsx"),
    route("/cart", "routes/user/cart.tsx"),
    route("/notifications", "routes/user/notification.tsx"),
  ]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
