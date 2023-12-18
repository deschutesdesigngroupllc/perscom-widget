const constants = {
  app: {
    API_KEY: process.env.REACT_APP_API_KEY,
    API_URL: process.env.REACT_APP_API_URL,
    PERSCOM_ID: process.env.REACT_APP_PERSCOM_ID,
    TIMEZONE: process.env.REACT_APP_TIMEZONE,
    WIDGET_URL: process.env.REACT_APP_WIDGET_URL,
    WIDGET_VERSION: process.env.REACT_APP_WIDGET_VERSION
  },
  sentry: {
    SENTRY_ORG: process.env.REACT_APP_SENTRY_ORG,
    SENTRY_PROJECT: process.env.REACT_APP_SENTRY_PROJECT,
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.REACT_APP_SENTRY_AUTH_TOKEN
  }
};

export const config = constants;
