import { ViteReactSSG } from 'vite-react-ssg'
import App from './App'
import { routes } from './routes'

export const createRoot = ViteReactSSG(
  App,
  { routes },
  ({ app, router, isClient }) => {
    // You can perform additional setup here if needed
  }
)
