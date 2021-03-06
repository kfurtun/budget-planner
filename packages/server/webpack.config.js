const path = require("path");

module.exports = {
  target: "node",
  entry: "./src/app.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
  },
};
