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
    devtool: 'source-map'
  },
  publicPath: process.env.VUE_APP_BASE_PATH !== undefined ? process.env.VUE_APP_BASE_PATH : "/"
};
