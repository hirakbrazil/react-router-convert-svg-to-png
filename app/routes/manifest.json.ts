// app/routes/manifest.json.ts
import type { LoaderFunction } from "react-router";
import { siteConfig } from "~/config/site";

export const loader: LoaderFunction = async () => {
  const manifest = {
    name: siteConfig.name,
    description: siteConfig.description,
    icons: [
      {
        src: "icon.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
    start_url: "./?utm_source=pwa&utm_medium=homescreen&utm_campaign=installed_app",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff"
  };
  
  return new Response(JSON.stringify(manifest), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
};
