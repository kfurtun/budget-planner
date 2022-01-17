const path = require("path");

module.exports = {
  target: "node",
  entry: "./src/app.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
};
