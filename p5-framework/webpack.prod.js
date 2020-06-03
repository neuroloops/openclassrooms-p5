process.env.NODE_ENV = 'production';
/* eslint-disable */
const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extract css from each js file
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin'); // This plugin uses terser to minify your JavaScript.
const PurgecssPlugin = require('purgecss-webpack-plugin');
/* eslint-enable */
const common = require('./webpack.common');

const PATHS = {
  src: path.join(__dirname, 'src'),
};

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              // eslint-disable-next-line
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCssPlugin(),
      new TerserJsPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
});
