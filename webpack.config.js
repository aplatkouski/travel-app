const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {
  DefinePlugin,
  SourceMapDevToolPlugin,
  HotModuleReplacementPlugin,
} = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.tsx',
  },
  target: 'web',
  resolve: {
    descriptionFiles: ['package.json'],
    modules: ['node_modules'],
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg'],
  },
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: 5000,
  },
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
    watchContentBase: true,
  },
  output: {
    assetModuleFilename: 'assets/[name][ext]',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.env.development.local'),
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'index.html',
      template: './src/template.ejs',
      title: 'Travel App',
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /(?<!\.d)\.tsx?$/,
        exclude: /node_modules|\.d\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        use: ['source-map-loader'],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(?:jpe?g|png|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(?:mp3|wav)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[name][ext]',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
    ],
  },
};
