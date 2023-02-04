const constants = {
  app: {
    WIDGET_VERSION: process.env.REACT_APP_WIDGET_VERSION,
    ENVIRONMENT: process.env.REACT_APP_WIDGET_ENVIRONMENT,
    API_KEY: process.env.REACT_APP_API_KEY,
    PERSCOM_ID: process.env.REACT_APP_PERSCOM_ID
  },
  roster: {
    API_URL: process.env.REACT_APP_ROSTER_API_URL,
    IFRAME_URL: process.env.REACT_APP_ROSTER_IFRAME_URL
  },
  awards: {
    API_URL: process.env.REACT_APP_AWARDS_API_URL,
    IFRAME_URL: process.env.REACT_APP_AWARDS_IFRAME_URL
  },
  ranks: {
    API_URL: process.env.REACT_APP_RANKS_API_URL,
    IFRAME_URL: process.env.REACT_APP_RANKS_IFRAME_URL
  },
  sentry: {
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
    SENTRY_SAMPLE_RATE: process.env.REACT_APP_SENTRY_SAMPLE_RATE
  }
}

export const config = constants
