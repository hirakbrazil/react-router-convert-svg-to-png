import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { toast } from 'sonner'

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    toast('Update available!', {
      action: {
        label: 'Reload',
        onClick: () => updateSW(true),
      },
      duration: Infinity,
    });
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  }
})

createRoot(document.getElementById("root")!).render(<App />);
