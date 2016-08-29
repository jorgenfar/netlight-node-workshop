const path = require('path');

module.exports = {
  // The file that Webpack should load
  entry: './index.js',

  // Where the output should be placed and named
  output: {
    // The directory to add the built files to
    path: path.join(__dirname, "umd"),
    // The filename for the built file
    filename: "Compliments.min.js",
    // What the library name should be, will be used in the browser
    library: "Compliments",
    // What type of library we want
    libraryTarget: "umd"
  },
  module: {
    // We need to add a loader to manage .json files
    loaders: [{
      // Regexp that matches files that ends with .json
      test: /\.json$/,
      // The loader we want to use
      loader: 'json-loader'
    }]
  }
};
