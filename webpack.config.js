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
    contentBase: "./public",//���ط����������ص�ҳ�����ڵ�Ŀ¼
    colors: true,//�ն���������Ϊ��ɫ
    historyApiFallback: true,//����ת
    inline: true//ʵʱˢ��
  } 
};