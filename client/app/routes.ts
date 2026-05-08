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

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
