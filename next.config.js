const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'perscom-development.s3.amazonaws.com',
      'perscom-staging.s3.amazonaws.com',
      'perscom.s3.amazonaws.com'
    ]
  },
  sentry: {
    hideSourceMaps: true
  }
};

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
