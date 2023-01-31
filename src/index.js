import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import './assets/css/widget.css'
import Roster from './pages/Roster'
import { config } from './constants'

Sentry.init({
  dsn: config.sentry.SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: config.sentry.SENTRY_SAMPLE_RATE
})

const rosterDivs = document.querySelectorAll('#perscom_roster')
rosterDivs.forEach((domElement) => {
  const roster = ReactDOM.createRoot(domElement)
  roster.render(
    <React.StrictMode>
      <Roster domElement={domElement} />
    </React.StrictMode>
  )
})
