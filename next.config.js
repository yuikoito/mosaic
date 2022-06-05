/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  env: {
    AWS_PROJECT_REGION: process.env.AWS_PROJECT_REGION,
    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
    AWS_USER_POOLS_ID: process.env.AWS_USER_POOLS_ID,
    AWS_USER_POOLS_CLIENT_ID: process.env.AWS_USER_POOLS_CLIENT_ID,
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
};

module.exports = nextConfig;
