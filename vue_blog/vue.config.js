module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
    },
  },
};
