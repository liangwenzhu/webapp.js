module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "prd/build.js"
  },
  module: {
    loaders: [
      { test: /\.js$/,loader: "babel-loader" }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [],
  devtool:'eval-source-map',
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
};