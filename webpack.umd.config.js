const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const pkg = require('./package.json')

module.exports = {
  mode: 'production',
  entry: {
    [pkg.name]: path.resolve(__dirname, 'src/index'),
  },
  output: {
    library: 'ReactJkMusicPlayer',
    libraryTarget: 'umd',
    umdNamedDefine: true, // 是否将模块名称作为 AMD 输出的命名空间
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    libraryExport: 'default', // 将default默认导出, 不然会 window['xx'].default
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: '/node_modules/',
        include: [path.resolve('src')],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: false },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(` \n ${pkg.name} v${pkg.version} \n ${
      pkg.description
    }
     \n ${fs.readFileSync(path.resolve(__dirname, './LICENCE'))}
  `),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEBUG__: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    process.env.ANALYZER && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
}
