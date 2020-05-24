module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/static/scss/_global.scss";
        `
      }
    }
  },
  configureWebpack: {
    devtool: 'eval-source-map'
  }
};
