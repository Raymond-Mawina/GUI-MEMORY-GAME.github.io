const path = require("path");

module.exports = {
  entry: {
    dom_manipulation: path.resolve(__dirname, "src", "dom_manipulation.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
