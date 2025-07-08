import Index from './pages/Index'
import About from './pages/About'
import Feedback from './pages/Feedback'
import NotFound from './pages/404'
import { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  { path: '/', element: <Index /> },
  { path: '/about', element: <About /> },
  { path: '/feedback', element: <Feedback /> },
  { path: '*', element: <NotFound /> }
]
