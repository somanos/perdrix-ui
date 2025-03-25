const { resolve } = require("path");
const { exec } = require('shelljs');
const { readFileSync, writeFileSync } = require('jsonfile');

class DrumeeSyncer {
  constructor(opt) {
    this.options = opt || {};
    this.src_path = resolve(__dirname, '..');
  }

  apply(compiler) {
    compiler.hooks.done.tap('Drumee Sync Plugin', (
      stats /* stats is passed as argument when done hook is tapped.  */
    ) => {
      this.target = this.options.target;
      this.bundle_path = this.options.bundle_path;
      let data = this.get_hash(stats);
      console.log("Building  with HASH=[hash]", data, this.options)
    });
  }



  get_hash(stats) {
    let { bundle_path, output_filename } = this.options;
    console.log(`BUILDING FROM HASH=${stats.hash}`, this.options);
    let file = resolve(bundle_path, "index.json");
    const { stdout } = exec("git log -1 --pretty=format:'%h:%H' --abbrev-commit", { silent: true });
    let [sep, short, long] = stdout.split(/[\':]/);
    let p = readFileSync(resolve(this.src_path, 'package.json'));
    let no_hash = output_filename == "[name].js" ? 1 : 0;
    let data = {
      hash: stats.hash,
      timestamp: new Date().getTime(),
      head: long,
      rev: short,
      version: p.version,
      no_hash: no_hash
    }
    console.log(`Writing data into ${file} `, data);
    try {
      writeFileSync(file, data);
    } catch (e) {
      console.error(`GOT ERROR while trying to sync: \n`, e);
      return;
    }
    console.log(`Done.`);
    return data;
  }
}

module.exports = DrumeeSyncer;
