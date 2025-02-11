
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'No URL provided' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`Fetching image from: ${url}`)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch image' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: response.status }
      )
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      console.error(`Invalid content type: ${contentType}`)
      return new Response(
        JSON.stringify({ error: 'URL does not point to a valid image' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Convert the response to an ArrayBuffer
    const imageData = await response.arrayBuffer()
    
    // Forward the image with CORS headers and the original content type
    const headers = new Headers(corsHeaders)
    headers.set('Content-Type', contentType)
    
    return new Response(imageData, { 
      headers,
      status: 200
    })

  } catch (error) {
    console.error('Error in fetch-image-proxy:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
