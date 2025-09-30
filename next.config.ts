import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpackDevMiddleware: (config: {
    watchOptions: { poll: number; aggregateTimeout: number };
  }) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    domains: [
      `localhost`,
      "img.freepik.com",
      "funny-harmony-ea89b56a43.strapiapp.comhttps",
      "funny-harmony-ea89b56a43.media.strapiapp.com", // ضيف الدومين ده
    ],
  },
};

export default nextConfig;
