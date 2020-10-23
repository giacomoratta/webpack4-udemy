const path = require('path')
const webpack = require('webpack')

// hot-reloading when html changes
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    /* extensions not needed because of resolve.extensions */
    main: './src/main',
    polyfills: './src/angular-polyfills',
    angular: './src/angular',
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devtool: 'source-map',
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',

    // show error overlay
    overlay: true,

    // tune webpack output
    stats: {
      colors: true
    },

    // hot reloading
    hot: true,

    // needed for Angular Routing
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          { loader: 'awesome-typescript-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: [

          // both loaders replaced by HTMLWebpackPlugin which does the same functions
          // { loader: 'file-loader', options: { name: "[name].html" } },
          // { loader: 'extract-loader' },

          {
            // does the linting
            loader: 'html-loader',
            options: {
              attributes: {
                list: [
                  // All default supported tags and attributes
                  '...',
                  {
                    tag: 'img',
                    attribute: 'data-src',
                    type: 'src'
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // hash not required, just example
              name: 'images/[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // needed for hot-reloading
    new webpack.ContextReplacementPlugin(
      // Set the context for Angular.
      // When webpack sees angular/core, the context for imports is /src,
      // so it does not try to import from node_modules
      /angular(\\|\/)core/,
      path.join(__dirname, './src'),
      {}
    ),
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
