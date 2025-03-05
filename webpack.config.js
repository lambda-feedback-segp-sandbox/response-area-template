const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config();

module.exports = {
  entry: './components/WebComponents.tsx',
  output: {
    filename: 'web-components.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: { 'next/font/google': path.resolve(__dirname, 'mocks/fonts.ts') },
  },
  plugins: [
    // fix "process is not defined" error:
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { allowTsInNodeModules: true },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
}
