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
  publicPath: process.env.VUE_APP_BASE_PATH !== undefined ? process.env.VUE_APP_BASE_PATH : "/"
};
