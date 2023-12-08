import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import './assets/css/widget.css'
import { config } from './constants'
import App from './pages/App'
import 'iframe-resizer/js/iframeResizer.contentWindow.min'

Sentry.init({
  dsn: config.sentry.SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      )
    }),
    new Sentry.Replay()
  ],
  tracesSampleRate: config.sentry.SENTRY_SAMPLE_RATE,
  tracePropagationTargets: ['lvh.me', /^https:\/\/widget.perscom.io/, /^https:\/\/widget.staging.perscom.io/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
