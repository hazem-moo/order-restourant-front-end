import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      `localhost`,
      "img.freepik.com",
      "funny-harmony-ea89b56a43.strapiapp.comhttps",
      "funny-harmony-ea89b56a43.media.strapiapp.com", // ضيف الدومين ده
    ],
  },
  env: {
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  },
};

export default nextConfig;
