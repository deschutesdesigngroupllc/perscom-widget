const constants = {
  app: {
    ENVIRONMENT: process.env.REACT_APP_WIDGET_ENVIRONMENT,
    WIDGET_VERSION: process.env.REACT_APP_WIDGET_VERSION,
    WIDGET_URL: process.env.REACT_APP_WIDGET_URL,
    API_KEY: process.env.REACT_APP_API_KEY,
    PERSCOM_ID: process.env.REACT_APP_PERSCOM_ID,
    JWT: process.env.REACT_APP_JWT
  },
  roster: {
    API_URL: process.env.REACT_APP_ROSTER_API_URL
  },
  awards: {
    API_URL: process.env.REACT_APP_AWARDS_API_URL
  },
  ranks: {
    API_URL: process.env.REACT_APP_RANKS_API_URL
  },
  qualifications: {
    API_URL: process.env.REACT_APP_QUALIFICATIONS_API_URL
  },
  sentry: {
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
    SENTRY_SAMPLE_RATE: process.env.REACT_APP_SENTRY_SAMPLE_RATE
  }
}

export const config = constants
