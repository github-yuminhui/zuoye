const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

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
      filename: "bundle.js",
      path: path.resolve(process.cwd(), "dist"),
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './dist',
      hot: true,
      // port: 3000,
      // open: true
    },
    module: {
      rules: [{
          test: /\.css$/,
          include: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: /\.css$/,
          exclude: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: ["style-loader", "css-loader?modules", "postcss-loader"]
        },
        {
          test: /\.less$/,
          include: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
        },
        {
          test: /\.less$/,
          exclude: [path.resolve(process.cwd(), 'src/styles'), /node_modules/],
          use: ["style-loader", "css-loader?modules", "postcss-loader", "less-loader"]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   enforce: "pre",
        //   use: "eslint-loader"
        // },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: "url-loader",
          options: {
            limit: 10000
          }
        }
      ]
    },
    plugins: [

      new HtmlWebpackPlugin({
        title: 'Github热门项目',
        template: "public/index.html"
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      // new MiniCssExtractPlugin({
      //   filename: "css/[name].[chunkHash:5].css"
      // }),
      // new CopyPlugin([
      //   {
      //     from: path.resolve(process.cwd(), "src/static/"),
      //     to: path.resolve(process.cwd(), "dist/static/")
      //   }
      // ])
    ],
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    }
  };
};