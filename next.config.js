const { withSentryConfig } = require('@sentry/nextjs');
const { config } = require('./lib/constants');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'perscom-development.s3.amazonaws.com',
      'perscom-staging.s3.amazonaws.com',
      'perscom.s3.amazonaws.com'
    ]
  },
};

const sentryWebpackPluginOptions = {
  org: config.sentry.SENTRY_ORG,
  project: config.sentry.SENTRY_PROJECT,
  authToken: config.sentry.SENTRY_AUTH_TOKEN,
  silent: true
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
