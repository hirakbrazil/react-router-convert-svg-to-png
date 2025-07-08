import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['banner.jpg', 'icon.png'],
      manifest: {
        name: 'Paste Image to Download',
        short_name: 'Paste Image to Download',
        description: 'Easily download copied images with Paste Image to Download tool.',
        theme_color: '#07a36c',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,json}'],
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20 MB
        runtimeCaching: [
          {
            urlPattern: /\/fonts\/.*\.woff2$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          },
          {
            urlPattern: new RegExp('^https://pasteimagetodownload\\.com/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname === '/about';
            },
            handler: 'CacheFirst',
            options: {
              cacheName: 'pre-rendered-pages',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname === '/feedback';
            },
            handler: 'CacheFirst',
            options: {
              cacheName: 'pre-rendered-pages',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname === '/about/' || url.pathname === '/feedback/';
            },
            handler: async ({ url }) => {
              // Redirect trailing slash versions to clean URLs
              const cleanPath = url.pathname.slice(0, -1);
              return Response.redirect(url.origin + cleanPath, 301);
            }
          }
        ],
        // Use navigateFallback only for unknown routes, not for pre-rendered pages
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          /^\/api/,
          /\.(?:png|jpg|jpeg|svg|gif|webp|js|css|woff2?)$/,
          /^\/about$/,
          /^\/feedback$/,
          /^\/404\.html$/
        ],
        // Ensure all pre-rendered HTML files are included in precache
        dontCacheBustURLsMatching: /\.\w{8}\./,
        // Additional files to precache - these will be served directly
        additionalManifestEntries: [
          { url: '/about/index.html', revision: null },
          { url: '/feedback/index.html', revision: null },
          { url: '/404.html', revision: null }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: ['es2015', 'chrome60', 'firefox60', 'safari11'],
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
