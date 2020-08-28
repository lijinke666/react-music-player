const env = process.env.BABEL_ENV || process.env.NODE_ENV
const outputModule = process.env.OUTPUT_MODULE

const plugins = [
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-class-properties',
]

if (env === 'test') {
  plugins.push('@babel/plugin-transform-modules-commonjs', '@babel/plugin-transform-runtime')
}

if (env === 'development') {
  plugins.push('react-hot-loader/babel')
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: outputModule || false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: plugins.filter(Boolean),
}
