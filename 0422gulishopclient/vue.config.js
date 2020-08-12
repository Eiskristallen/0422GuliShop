module.exports = {
  lintOnSave: false,
  devServer: {
    //只要发请求,以api开头的,都会转发到这个地址
    proxy: {
      '/api': {
        target: 'http://123.57.205.78/',
      },
    },
  },
};
