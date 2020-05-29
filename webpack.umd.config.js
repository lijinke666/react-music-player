const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const { version, name, description } = require('./package.json')

module.exports = {
  mode: 'production',
  entry: {
    [name]: path.resolve(__dirname, 'src/index'),
  },

  output: {
    library: name,
    libraryTarget: 'umd',
    umdNamedDefine: true, // 是否将模块名称作为 AMD 输出的命名空间
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
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
    new webpack.BannerPlugin(` \n ${name} v${version} \n ${description}
     \n ${fs.readFileSync(path.resolve(__dirname, './LICENCE'))}
  `),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEBUG__: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
}
