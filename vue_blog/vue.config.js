module.exports = {
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
