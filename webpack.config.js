var webpack = require('webpack');
  
  module.exports = {
	  entry: {
		  app: './app', //编译的入口文件
		  index: './index', //编译的入口文件
	  },
	  output: {
		  publicPath: '/build/', //服务器根路径
		  path: './build', //编译到当前目录
		  filename: '[name].js' //编译后的文件名字
	  },
	  module: {
		  loaders: [{
				  test: /\.js$/,
				  loader: 'babel?presets=es2015'
			  }
		  ]
	  },
	  plugins: [
			  new webpack.optimize.CommonsChunkPlugin('common.js') //将公用模块，打包进common.js
	  ],
	  resolve: {
		  extensions: ['', '.js', '.jsx'] //后缀名自动补全
	  }
  };