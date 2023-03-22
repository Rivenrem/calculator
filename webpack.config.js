const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  }),
  new webpack.ProvidePlugin({
    React: "react",
  }),
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,
  target,
  plugins,
  entry: "./src/index.js",
  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devServer: {
    hot: true,
    historyApiFallback: true,
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
    publicPath: "/",
  },

  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src/components/"),
      Pages: path.resolve(__dirname, "src/pages/"),
      Layouts: path.resolve(__dirname, "src/layouts/"),
      Fonts: path.resolve(__dirname, "src/fonts/"),
      Store: path.resolve(__dirname, "src/store/"),
      Commands: path.resolve(__dirname, "src/commands/"),
      Utils: path.resolve(__dirname, "src/utils/"),
      Constants: path.resolve(__dirname, "src/constants/"),
    },
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === "production" ? "asset" : "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
