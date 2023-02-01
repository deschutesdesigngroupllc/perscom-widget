import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import './assets/css/widget.css'
import Roster from './pages/Roster'
import Awards from './pages/Awards'
import { config } from './constants'
import Ranks from './pages/Ranks'

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

const awardDivs = document.querySelectorAll('#perscom_awards')
awardDivs.forEach((domElement) => {
  const awards = ReactDOM.createRoot(domElement)
  awards.render(
    <React.StrictMode>
      <Awards domElement={domElement} />
    </React.StrictMode>
  )
})

const rankDivs = document.querySelectorAll('#perscom_ranks')
rankDivs.forEach((domElement) => {
  const ranks = ReactDOM.createRoot(domElement)
  ranks.render(
    <React.StrictMode>
      <Ranks domElement={domElement} />
    </React.StrictMode>
  )
})
