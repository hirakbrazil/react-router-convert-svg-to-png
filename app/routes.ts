import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("feedback", "routes/feedback.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("ads.txt", "routes/ads.txt.ts"),
  route("manifest.json", "routes/manifest.json.ts"),
] satisfies RouteConfig;
