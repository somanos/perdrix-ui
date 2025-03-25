
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DuplicatesPlugin } = require("inspectpack/plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const Sync = require('./sync');
const { readFileSync } = require('jsonfile');
const { resolve } = require("path");


devMode = 1;
const mode = process.env.UI_BUILD_MODE || 'devel';
if (mode.match(/^(prod|stag)/)) {
  devMode = 0;
}


const { version } = readFileSync(resolve(__dirname, '../package.json'));
const cssExtract = new MiniCssExtractPlugin({
  ignoreOrder: false, // Enable to remove warnings about conflicting order
  filename: devMode ? '[name].css' : '[name].[hash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  //sourceMap: true
})


const pluginsOptsion = {
  __VERSION__: JSON.stringify(version),
};


module.exports = function (webpack, opt) {
  a = [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new StatsWriterPlugin({
      fields: ["assets", "modules"],
      stats: {
        source: true // Needed for webpack5+
      }
    }),
    new DuplicatesPlugin({
      // Emit compilation warning or error? (Default: `false`)
      emitErrors: false,
      // Display full duplicates information? (Default: `false`)
      verbose: true
    }),
    cssExtract,
    new webpack.DefinePlugin(pluginsOptsion),
    new Sync(opt)
  ];
  return a;
}
