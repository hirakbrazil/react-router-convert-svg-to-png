// entry.tsx
import { ViteReactSSG } from 'vite-react-ssg'
import App from './App'
import { routes } from './routes'

// Export createApp as required by vite-react-ssg
export const createApp = ViteReactSSG({
  App,
  routes,
})
