const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { join } = require('path');
const Resolve = require('./webpack/resolve');
const Module = require('./webpack/module');
const Plugins = require('./webpack/plugins');
const args = require('./webpack.options.json');
const { name: appName } = require('./package.json');
const { existsSync } = require('fs');
/**
 * 
 * @param {*} entry 
 * @param {*} opt 
 * @returns 
 */
function makeOptions(entry, opt) {

  let output = {
    path: opt.bundle_path,
    publicPath: opt.public_path,
    filename: opt.output_filename || "[name]-[fullhash].js",
  };


  console.log(`Start building ${appName} with`, { entry, output, opt });

  const res = {
    mode: opt.mode || 'development',
    entry,
    output,
    resolve: Resolve(__dirname),
    plugins: Plugins(webpack, opt),
    module: Module(__dirname, opt.mode),
    node: {
      __filename: true
    },
    stats: {
      assets: true,
      modules: true,
      orphanModules: true,
    },
    context: __dirname,
    optimization: {
    }
  };

  if (['production'].includes(opt.mode)) {
    res.optimization.minimize = true;
    res.optimization.minimizer = [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Do not change
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: true,
          keep_fnames: true,
          safari10: false,
        },
      })
    ]
  }
  return res;
}

/**
 * 
 * @returns 
 */
function normalize() {
  let {
    bundle_path,
    bundle_base,
    public_path,
    output_filename,
    mode,
    entry_page,
    src_path
  } = args.dev;

  if(!src_path || !existsSync(src_path)){
    src_path=__dirname
  }
  output_filename = output_filename || "[name].js";
  mode = mode || 'development';

  if (!bundle_path) {
    throw "bundle_path must be set";
  }

  public_path = public_path || '/';
  if(!/.+\/$/) public_path=`${public_path}/`
  let opt = {
    bundle_path,
    bundle_base,
    public_path,
    output_filename,
    mode,
    entry_page,
    src_path,
    sync_templates: 1
  };
  if (output_filename == "[name].js") {
    opt.no_hash = 1;
  }
  console.log({ opt })
  return opt;
}


module.exports = function () {
  const opt = normalize();
  let main = join(__dirname, 'src', 'index');
  return makeOptions({ main }, opt);
}
