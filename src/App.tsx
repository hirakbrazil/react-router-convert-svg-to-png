import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, StaticRouter, useRoutes } from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'
import { routes } from './routes'

const queryClient = new QueryClient()

const AppRoutes = () => useRoutes(routes)

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
