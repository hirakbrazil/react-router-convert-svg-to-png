
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { routes } from './routes';

// This is the SSG entry point
export default App;

export { routes };

// Export the render function for SSG
export const render = (url: string) => {
  // For SSG, we don't need the full router setup since each page is pre-rendered
  return renderToString(React.createElement(App));
};
