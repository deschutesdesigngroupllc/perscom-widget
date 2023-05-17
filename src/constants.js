const constants = {
  app: {
    API_KEY: process.env.REACT_APP_API_KEY,
    ENVIRONMENT: process.env.REACT_APP_WIDGET_ENVIRONMENT,
    JWT: process.env.REACT_APP_JWT,
    PERSCOM_ID: process.env.REACT_APP_PERSCOM_ID,
    TIMEZONE: process.env.REACT_APP_TIMEZONE,
    WIDGET_URL: process.env.REACT_APP_WIDGET_URL,
    WIDGET_VERSION: process.env.REACT_APP_WIDGET_VERSION
  },
  roster: {
    API_URL: process.env.REACT_APP_ROSTER_API_URL
  },
  awards: {
    API_URL: process.env.REACT_APP_AWARDS_API_URL
  },
  calendars: {
    API_URL: process.env.REACT_APP_CALENDARS_API_URL
  },
  events: {
    API_URL: process.env.REACT_APP_EVENTS_API_URL
  },
  forms: {
    API_URL: process.env.REACT_APP_FORMS_API_URL
  },
  ranks: {
    API_URL: process.env.REACT_APP_RANKS_API_URL
  },
  qualifications: {
    API_URL: process.env.REACT_APP_QUALIFICATIONS_API_URL
  },
  users: {
    API_URL: process.env.REACT_APP_USERS_API_URL
  },
  sentry: {
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
    SENTRY_SAMPLE_RATE: process.env.REACT_APP_SENTRY_SAMPLE_RATE
  }
}

export const config = constants
