// src/App.tsx
import type { RouteRecord } from 'vite-react-ssg';
import React from 'react';
import Layout from './Layout';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/Layout.tsx',
    children: [
      {
        index: true,
        Component: React.lazy(() => import('./pages/Index')),
      },
      {
        path: 'about',
        Component: React.lazy(() => import('./pages/About')),
      },
      {
        path: 'feedback',
        Component: React.lazy(() => import('./pages/Feedback')),
      },
      {
        path: '*',
        Component: React.lazy(() => import('./pages/404')),
      },
    ],
  },
];
