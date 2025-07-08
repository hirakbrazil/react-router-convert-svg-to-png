import React from 'react'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import Layout from './Layout.js'

export { onRenderHtml }

async function onRenderHtml(pageContext) {
  const { Page, pageProps } = pageContext
  
  if (!Page) throw new Error('Page is undefined')

  const pageHtml = renderToString(
    React.createElement(Layout, { children: React.createElement(Page, pageProps) })
  )

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Easily download copied images with Paste Image to Download tool." />
        <meta name="theme-color" content="#07a36c" />
        <title>Paste Image to Download</title>
      </head>
      <body>
        <div id="react-container">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {}
  }
}