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
  serverRuntimeConfig: {
    // Will only be available on the server side
    contentHubEndPoint: 'https://himadri-ch-sandbox.stylelabs.io',
    contentHubAuth: {
      clientId: 'PhotoBlog',
      clientSecret: '26130e0f-0185-49d7-95cf-272f6000d2b0',
      username: 'photoblog',
      password: 'HXf&3A7tV$GDzbdC'
    }
  }
}
