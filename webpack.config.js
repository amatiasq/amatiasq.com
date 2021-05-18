const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'app.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.(png|jpe?g|gif)$/i, loader: 'file-loader' },
      { test: /\.codegen$/i, loader: 'parcel-codegen-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
};
