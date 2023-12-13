const constants = {
  app: {
    API_KEY: process.env.REACT_APP_API_KEY,
    API_URL: process.env.REACT_APP_API_URL,
    ENVIRONMENT: process.env.REACT_APP_WIDGET_ENVIRONMENT,
    PERSCOM_ID: process.env.REACT_APP_PERSCOM_ID,
    TIMEZONE: process.env.REACT_APP_TIMEZONE,
    WIDGET_URL: process.env.REACT_APP_WIDGET_URL,
    WIDGET_VERSION: process.env.REACT_APP_WIDGET_VERSION
  },
  sentry: {
    SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
    SENTRY_SAMPLE_RATE: process.env.REACT_APP_SENTRY_SAMPLE_RATE
  }
};

export const config = constants;
