const path = require("path");

module.exports = (_, argv) => ({
  entry: {
    popup: path.join(__dirname, "src/popup/index.tsx"),
    options: path.join(__dirname, "src/options/index.tsx")
  },
  devtool: argv.mode === 'production' ? "" : 'inline-source-map',
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
});
