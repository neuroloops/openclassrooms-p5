/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/* eslint-enable */

const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'js/[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jp(e*)g|gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              name: '[name]-[contenthash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      }, // end images rule
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
              name: '[name]-[contenthash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      }, // end svg rule
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[contenthash].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      }, // end font rule
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] },
          },
        ],
      },
    ], // end rules array
  }, // end module
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html',
      filename: 'index.html',
      title: 'Bienvenue chez Orinoco',
      chunks: ['index'],
    }),
  ],
}; // en module.export
