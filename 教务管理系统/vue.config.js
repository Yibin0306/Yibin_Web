const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "/",
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: "http://127.0.0.1:80",
    port:9090
  }
})
