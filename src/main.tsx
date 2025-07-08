import { createRoot, hydrateRoot } from 'react-dom/client'
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
        backgroundColor: 'var(--action-button-bg, #000000)',
        color: 'var(--action-button-text, #ffffff)',
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

const rootElement = document.getElementById("root")!;

// Check if the page is pre-rendered by react-snap
if (rootElement.hasChildNodes()) {
  // If there are child nodes, it means the page is pre-rendered, so hydrate
  hydrateRoot(rootElement, <App />);
} else {
  // If no child nodes, render normally
  const root = createRoot(rootElement);
  root.render(<App />);
  
  // Signal to react-snap that the page is ready (for pre-rendering)
  if (typeof window !== 'undefined' && (window as any).reactSnapCrawl) {
    setTimeout(() => {
      if ((window as any).reactSnapFinished) {
        (window as any).reactSnapFinished();
      }
    }, 2000);
  }
}

// Show success toast after <App /> + <Toaster> mounts
setTimeout(() => {
  if (localStorage.getItem('app-updated') === 'true') {
    toast.success('App updated successfully!', { duration: 5000 });
    localStorage.removeItem('app-updated');
  }
}, 200);
