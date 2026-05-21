import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'mora-sovereign-dashboard.vercel.app',
          },
        ],
        destination: 'https://portal.mora.gov.sl/:path*',
        permanent: true,
      },
    ];
  },
  */
};

export default nextConfig;
