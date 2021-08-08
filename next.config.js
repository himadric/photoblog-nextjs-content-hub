const path = require('path')

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
        config.resolve.fallback.fs = false
      }
    return config
  },
  images: {
    domains: ['himadri-ch-sandbox.stylelabs.io'],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, '../styles')],
  },
  env: {
    contentHubEndPoint: process.env.contentHubEndPoint,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    username: process.env.userId,
    password: process.env.password,
  },
}
