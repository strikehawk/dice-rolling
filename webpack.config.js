const path = require('path');

module.exports = {
  target: ['node'],
  mode: 'development',
  entry: './lib/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  watch: true,
  // output: {
  //   // globalObject: 'this',
  //   // libraryTarget: 'commonjs',
  //   // libraryExport: 'default',
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
};