import ReactDOMServer from 'react-dom/server'
import App from './App'
import { StaticRouter } from 'react-router-dom/server'

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}