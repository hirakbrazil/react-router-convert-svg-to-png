import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'
import './index.css'

export const createRoot = ViteReactSSG(
  // react-router-dom data routes
  { routes },
  // function to have custom setups
  ({ router, routes, isClient, initialState }) => {
    // Register PWA service worker only on client side
    if (isClient) {
      // Import PWA register dynamically to avoid SSR issues
      import('virtual:pwa-register').then(({ registerSW }) => {
        const updateSW = registerSW({
          onNeedRefresh() {
            updateSW(true)
          },
          onOfflineReady() {
            console.log('App ready to work offline')
          }
        })
      }).catch(() => {
        // PWA not available, continue without it
        console.log('PWA not available')
      })
    }
  },
)
