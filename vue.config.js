// vue.config.js
const Version = process.env.npm_package_version;
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  configureWebpack: {
    output: {
      filename: `js/[name].${Version}.js`,
      chunkFilename: `js/[name].${Version}.js`
    }
  },

  assetsDir: "assets",
  lintOnSave: true,
  productionSourceMap: true, 
  devServer: {
    open: false, 
    host: "0.0.0.0", 
    port: 8080 
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "龙舟争渡";
      return args;
    });
  }
};
