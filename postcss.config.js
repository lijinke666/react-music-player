/* eslint-disable global-require */
module.exports = {
  plugins: () => [
    require('autoprefixer')({
      browsers: [
        'last 6 versions',
        'Android >= 4.0',
        'Firefox ESR',
        'not ie < 9',
      ],
    }),
  ],
}
