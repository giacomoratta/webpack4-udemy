const path = require('path')
const webpack = require('webpack')
// const nodeExternal = require('webpack-node-externals')
const externals = require('./node-externals')

module.exports = {
  name: 'server',
  entry: {
    server: ['./src/server/render.js']
  },
  mode: 'development',
  output: {
    filename: 'dev-server-bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'commonjs2'
  },

  // target: default is 'web'
  // since is 'node', it will not create a bundle because node can access webpack npm
  target: 'node',

  // everything in node_modules will be skipped
  externals,
  // externals: nodeExternal(),

  module: {

    /* Rules which affects single files */
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name].[ext]',

              // avoid emitting image files with bundle
              emitFile: false
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'markdown-with-front-matter-loader'
          }
        ]
      }
    ]
  },

  /* Plugins affect the entire bundle */
  plugins: [

    // only one bundle = dev-server-bundle.js
    // very important for SSR!
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        CUSTOM_VAR1: JSON.stringify('value1-dev')
      }
    })
  ]
}
