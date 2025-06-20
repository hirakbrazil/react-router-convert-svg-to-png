
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

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Dispatch event for prerendering
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    document.dispatchEvent(new Event('render-event'));
  });
}
