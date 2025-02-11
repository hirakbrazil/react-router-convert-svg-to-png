
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: "No URL provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Fetching image from: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      return new Response(JSON.stringify({ error: "URL does not point to a valid image" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    console.log(`Successfully fetched image. Content-Type: ${contentType}, Size: ${arrayBuffer.byteLength} bytes`);

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": contentType,
        "Content-Length": arrayBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Error in fetch-image-proxy:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
