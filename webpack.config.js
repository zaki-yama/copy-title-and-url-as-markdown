const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    popup: path.join(__dirname, "src/popup.ts"),
    options: path.join(__dirname, "src/options.ts")
  },
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
