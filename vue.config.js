module.exports = {
  publicPath: './',
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
      clientLogLevel: 'info',
      watchOptions: {
          poll: true
      }
  }
}
