const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'perscom-development.s3.amazonaws.com',
      'perscom-staging.s3.amazonaws.com',
      'perscom.s3.amazonaws.com'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/perscom-local/**/**'
      }
    ]
  },
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    disableLogger: true,
    automaticVercelMonitors: true
  }
};

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withSentryConfig(withBundleAnalyzer(nextConfig), sentryWebpackPluginOptions);
