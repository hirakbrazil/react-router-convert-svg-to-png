import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import Layout from './Layout.js'

export { onRenderClient }

async function onRenderClient(pageContext) {
  const { Page, pageProps } = pageContext
  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined')
  
  const container = document.getElementById('react-container')
  if (!container) throw new Error('DOM element #react-container not found')

  const page = React.createElement(Layout, { children: React.createElement(Page, pageProps) })
  
  hydrateRoot(container, page)
}