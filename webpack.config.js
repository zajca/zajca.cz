/**
 * THIS IS DUMMY FILE TO LEAD PHPSTORM TO RESOLVE ALIAS
 */
const path = require("path")

module.exports = {
  resolve: {
    extensions: [".js", ".json", ".vue", ".ts"],
    root: path.resolve(__dirname),
    alias: {
      "@": path.resolve(__dirname),
      "~": path.resolve(__dirname)
    }
  }
}
