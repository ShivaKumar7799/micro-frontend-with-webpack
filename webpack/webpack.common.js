const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Footer': './src/Components/Footer',
        './Counter': './src/Components/Counter',
      },
      shared: {
        react: { eager: true },
        'react-dom': { eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
  ],
  stats: 'errors-only',
};
