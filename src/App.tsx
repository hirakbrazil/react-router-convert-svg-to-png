import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { StaticRouter } from 'react-router' // ✅ correct import here
import ScrollToTop from '@/components/ScrollToTop'
import { routes } from './routes'

const queryClient = new QueryClient()

const AppRoutes = () => {
  const element = useRoutes(routes)
  return element
}

const App = ({ url }: { url?: string }) => {
  const isSSR = typeof window === 'undefined'
  const Router = isSSR ? StaticRouter : BrowserRouter
  const routerProps = isSSR ? { location: url || '/' } : {}

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router {...routerProps}>
          <ScrollToTop />
          <AppRoutes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
