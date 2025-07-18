import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("feedback", "routes/feedback.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
