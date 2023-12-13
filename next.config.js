/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'perscom-development.s3.amazonaws.com',
      'perscom-staging.s3.amazonaws.com',
      'perscom.s3.amazonaws.com'
    ]
  }
};

module.exports = nextConfig;
