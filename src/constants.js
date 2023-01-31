const constants = {
  version: {
    WIDGET_VERSION: process.env.REACT_APP_WIDGET_VERSION
  },
  roster: {
    API_URL: process.env.REACT_APP_API_URL
  },
  sentry: {
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
    SENTRY_SAMPLE_RATE: process.env.REACT_APP_SENTRY_SAMPLE_RATE
  }
}

export const config = constants
