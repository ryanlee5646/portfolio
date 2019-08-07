const path = require('path');

module.exports = {
  outputDir: 'backend/public',
  assetsDir: 'assets',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        secure: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  pwa: {
    name: 'ssafy',
    theme_color: '#4DBA87',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
    },
  },
};
