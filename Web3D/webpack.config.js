const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // 访问内置的插件
module.exports = {
  entry: {
    box: "./src/box.ts",
    main: "./src/main.ts",
    game: "./phaser-game/game.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash].js",
  },
  mode: "development",
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/main.html"),
      filename: "main.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/box.html"),
      filename: "box.html",
      chunks: ["box"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/game.html"),
      filename: "game.html",
      chunks: ["game"],
    }),
  ],
};
