// @ts-check

const path = require("path");

const isProduction = process.env.NODE_ENV === "production";
const outputDir = process.env.BRANCH === 'dev' ? 'dev' : '.next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: outputDir,
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "brkeuntd-8a626.web.app",
      },
      {
        protocol: "https",
        hostname: "assets.bigcartel.com",
      },
    ],
  },
  compiler: {
    reactRemoveProperties: isProduction,
    removeConsole: isProduction,
    styledComponents: {
      displayName: !isProduction,
      minify: isProduction,
      pure: true,
    },
  },
  devIndicators: {
    buildActivityPosition: "top-right",
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }

    return config;
  },
  productionBrowserSourceMaps: isProduction,
};

module.exports = nextConfig;
