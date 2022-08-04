const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    newNextLinkBehavior: true,
    images: {
      unoptimized: true,
      allowFutureImage: true,
    },
  },
}

module.exports = withMarkdoc()(nextConfig)
