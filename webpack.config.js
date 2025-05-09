const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app.js", // Your entry file
  output: {
    filename: "bundle.js", // The output filename
    path: path.resolve(__dirname, "dist"), // Output directory
    clean: true, // Clean the dist folder before each build
  },
  mode: "development", // Set mode to 'development'
  devServer: {
    static: "./dist", // Serve content from the dist folder
    open: true, // Open the browser after the server starts
    hot: true, // Enable Hot Module Replacement
    watchFiles: ["src/**/*", "dist/**/*"], // Watch files for changes
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Your HTML template located in src
      filename: "index.html", // Name of the generated file in dist
    }),
  ],
};
