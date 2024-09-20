import "./env.mjs"

import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale/dashboard",
        destination: "/:locale/dashboard/home",
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
