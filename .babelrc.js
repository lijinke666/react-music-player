const env = process.env.BABEL_ENV || process.env.NODE_ENV
const outputModule = process.env.OUTPUT_MODULE

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
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    env === 'test' && '@babel/plugin-transform-modules-commonjs',
    env === 'development' && 'react-hot-loader/babel',
  ].filter(Boolean),
}
