const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (env, argv) {
  const isEnvDevelopment = argv.mode === "development" || !argv.mode;
  const isEnvProduction = argv.mode === "production";

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    devtool: isEnvProduction ?
      "source-map" :
      isEnvDevelopment && "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
      publicPath:'./',
      filename: "js/[name].[contenthash:8].js",
      // filename: "js/bundle.js",
      path: path.resolve(process.cwd(), "dist")
    },
    module: {
      rules: [{
          test: /\.css$/,
          include: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        },
        {
          test: /\.css$/,
          exclude: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: [MiniCssExtractPlugin.loader, "css-loader?modules", "postcss-loader"]
        },
        {
          test: /\.scss$/,
          include: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        {
          test: /\.scss$/,
          exclude: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: [MiniCssExtractPlugin.loader, "css-loader?modules", "sass-loader"]
        },
        {
          test: /\.less$/,
          include: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
        },
        {
          test: /\.less$/,
          exclude: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: [MiniCssExtractPlugin.loader, "css-loader?modules", "postcss-loader", "less-loader"]
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   enforce: "pre",
        //   use: "eslint-loader"
        // },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.(woff|woff2|svg|ttf|eot)$/,
          use: [{
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[hash:8].[ext]',
                limit: 80000
              }
            } //项目设置打包到dist下的fonts文件夹下
          ]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "url-loader",
          options: {
            name: 'images/[name].[ext]',
            limit: 10000
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Github热门项目',
        template: "public/index.html",

      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      }),
      // new BundleAnalyzerPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        },
      },
    }
  };
};