const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: ['./src/AdManager.ts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  target: 'web',
  output: {
    filename: 'ad-manager.js',
    path: __dirname + '/build-dev'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: 'views/index.html'
    })
  ],
  devtool: 'inline-source-map',
  watch: false
};
