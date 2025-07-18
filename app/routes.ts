import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Index.tsx"),
  route("about", "routes/about.tsx"),
  route("feedback", "routes/Feedback.tsx"),
  route("privacy", "routes/Privacy.tsx"),
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
