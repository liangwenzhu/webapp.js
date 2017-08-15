var webpack = require('webpack');
  
  module.exports = {
	  entry: {
		  app: './app', //���������ļ�
		  index: './index', //���������ļ�
	  },
	  output: {
		  publicPath: '/build/', //��������·��
		  path: './build', //���뵽��ǰĿ¼
		  filename: '[name].js' //�������ļ�����
	  },
	  module: {
		  loaders: [{
				  test: /\.js$/,
				  loader: 'babel?presets=es2015'
			  }
		  ]
	  },
	  plugins: [
			  new webpack.optimize.CommonsChunkPlugin('common.js') //������ģ�飬�����common.js
	  ],
	  resolve: {
		  extensions: ['', '.js', '.jsx'] //��׺���Զ���ȫ
	  }
  };