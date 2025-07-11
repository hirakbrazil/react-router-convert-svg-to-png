import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { toast } from 'sonner'

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
      actionButtonStyle: {
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        fontWeight: '500',
        cursor: 'pointer',
      },
    });
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  }
});

createRoot(document.getElementById("root")!).render(<App />);

// Show success toast after <App /> + <Toaster> mounts
setTimeout(() => {
  if (localStorage.getItem('app-updated') === 'true') {
    toast.success('App updated successfully!', { duration: 5000 });
    localStorage.removeItem('app-updated');
  }
}, 200);
