import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";
import { siteConfig } from "./app/config/site";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: "./server/app.ts",
        }
      : undefined,
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),
           VitePWA({
      registerType: 'prompt',
      includeAssets: ['banner.jpg', 'icon.png'],
      manifest: {
        name: siteConfig.name,
        short_name: siteConfig.name,
        description: siteConfig.description,
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
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
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
        ],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api/,
                                  /^\/ads\.txt$/,
                                  /^\/robots\.txt$/,
                                  ]
      }
    })
           ],
}));
