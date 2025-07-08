import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Only for client, will not run during SSG build
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    import('react-dom/client').then(({ hydrateRoot }) => {
      import('./App').then(({ default: App }) => {
        hydrateRoot(rootElement, <App />)
      })
    })
  }

  // Register service worker only on client-side
  if ('serviceWorker' in navigator) {
    import('virtual:pwa-register').then(async ({ registerSW }) => {
      const { toast } = await import('sonner')
      const updateSW = registerSW({
        onNeedRefresh() {
          toast.info('Update available!', {
            action: {
              label: 'Reload',
              onClick: () => {
                localStorage.setItem('app-updated', 'true')
                setTimeout(() => updateSW(true), 200)
              },
            },
            duration: Infinity,
          })
        },
        onOfflineReady() {
          console.log('App ready to work offline')
        },
      })

      setTimeout(() => {
        if (localStorage.getItem('app-updated') === 'true') {
          toast.success('App updated successfully!', { duration: 5000 })
          localStorage.removeItem('app-updated')
        }
      }, 200)
    })
  }
}
