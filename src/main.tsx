import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
  updateSW(true)
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  }
})

createRoot(document.getElementById("root")!).render(<App />);
