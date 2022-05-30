const path = require("path");

module.exports = (_, argv) => ({
  entry: {
    popup: path.join(__dirname, "src/popup/index.tsx"),
    options: path.join(__dirname, "src/options/index.tsx"),
    background: path.join(__dirname, "src/background.ts"),
  },
  devtool: argv.mode === "production" ? false : "inline-source-map",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
});
