// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // Entry file
  entry: "./src/app.js",

  // Output bundle
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  mode: "development",

  // Development server
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    watchFiles: ["src/**/*", "dist/**/*"],
  },

  plugins: [
    // Generates index.html from template
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    // Copies static assets
    new CopyWebpackPlugin({
      patterns: [
        { from: "icons", to: "icons" },
        { from: "src/style.css", to: "style.css" },
      ],
    }),
  ],
};
