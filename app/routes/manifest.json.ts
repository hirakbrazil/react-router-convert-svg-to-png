// app/routes/manifest.json.ts
import type { LoaderFunction } from "react-router";
import { siteConfig } from "~/config/site";

export const loader: LoaderFunction = async () => {
  const manifest = {
    short_name: siteConfig.name,
    name: siteConfig.name,
    description: siteConfig.description,
    icons: [
      {
        src: "icon.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
    start_url: ".",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    orientation: "portrait"
  };
  
  return new Response(JSON.stringify(manifest), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
};
