// app/routes/ads.txt.ts
import type { LoaderFunction } from "react-router";
import { siteConfig } from "~/config/site";

export const loader: LoaderFunction = async () => {
  // Get publisher ID and remove 'ca-' prefix if present
  const pubId = siteConfig.adsense.pubId.replace(/^ca-/, '');
  
  // Generate ads.txt content
  const adsContent = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0`;
  
  return new Response(adsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
};
