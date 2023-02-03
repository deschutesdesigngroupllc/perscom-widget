import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import './assets/css/widget.css'
import { config } from './constants'
import App from './pages/App'
import { BrowserRouter } from 'react-router-dom'

Sentry.init({
  dsn: config.sentry.SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: config.sentry.SENTRY_SAMPLE_RATE
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
