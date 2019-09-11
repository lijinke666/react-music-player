const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const HOST = 'localhost'
const PORT = 8081

module.exports = () => {
  const options = {
    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, '../example/example.js'),
    output: {
      path: path.join(__dirname, '../example/dist'),
      filename: '[name].[contenthash].js',
      publicPath:
        process.env.NODE_ENV === 'production' ? '/react-music-player' : '/'
    },
    //模块加载器
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ],
          exclude: '/node_modules/'
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: { minimize: false, sourceMap: true }
            },
            { loader: 'less-loader', options: { sourceMap: true } }
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' }, //loader 倒序执行  先执行 less-laoder
            {
              loader: 'css-loader',
              options: { minimize: false, sourceMap: true }
            }
          ]
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name][hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    devtool: 'source-map',
    //自动补全后缀
    resolve: {
      enforceExtension: false,
      extensions: ['.js', '.jsx', '.json'],
      modules: [path.resolve('src'), path.resolve('.'), 'node_modules']
    },
    externals: {
      async: 'commonjs async'
    },
    devServer: {
      contentBase: path.join(__dirname, '../example/'),
      compress: true,
      inline: true,
      port: PORT,
      publicPath: '/dist/',
      historyApiFallback: true,
      stats: {
        color: true,
        errors: true,
        version: true,
        warnings: true,
        progress: true
      }
    },
    plugins: [
      new OpenBrowserPlugin({
        url: `http:${HOST}:${PORT}/`
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../example/index.html')
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  }
  return options
}
