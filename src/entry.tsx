// entry.tsx
import { ViteReactSSG } from 'vite-react-ssg'
import App from './App'
import { routes } from './routes'

export const createApp = ViteReactSSG({
  App,
  routes,
})
