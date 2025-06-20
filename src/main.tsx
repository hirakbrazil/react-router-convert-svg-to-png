
import { ViteReactSSG } from 'vite-react-ssg'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { getStaticPaths } from './getStaticPaths'

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true)
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  }
})

export const routes = [
  {
    path: '/',
    component: () => import('./pages/Index'),
  },
  {
    path: '/about',
    component: () => import('./pages/About'),
  },
  {
    path: '/feedback',
    component: () => import('./pages/Feedback'),
  },
  {
    path: '/404',
    component: () => import('./pages/404'),
  }
]

export const createRoot = ViteReactSSG(
  { routes },
  ({ router, routes, isClient, initialState }) => {
    // Setup for SSG
  },
  {
    getStaticPaths
  }
)
