const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/css'),
  output: {
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEBUG__: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/index.css',
    }),
  ],
}
