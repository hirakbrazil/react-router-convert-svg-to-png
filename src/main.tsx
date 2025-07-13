
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { toast } from 'sonner'
import { ViteReactSSG } from 'vite-react-ssg'
import routes from './App.tsx'

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    toast.info('Update available!', {
      action: {
        label: 'Reload',
        onClick: () => {
          localStorage.setItem('app-updated', 'true');
          // Delay the reload to allow localStorage to save
          setTimeout(() => {
            updateSW(true);
          }, 200); // 200ms is enough
        },
      },
      duration: Infinity,
    });
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  }
});

export const createRoot = ViteReactSSG(
  // react-router-dom data routes
  { routes },
  // function to have custom setups
  ({ router, routes, isClient, initialState }) => {
    // do something.
  },
)

// Show success toast after <App /> + <Toaster> mounts
setTimeout(() => {
  if (localStorage.getItem('app-updated') === 'true') {
    toast.success('App updated successfully!', { duration: 5000 });
    localStorage.removeItem('app-updated');
  }
}, 200);
