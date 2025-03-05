const Path    = require("path");
const _       = require("lodash");
const Shell   = require('shelljs');
const Jsonfile  = require('jsonfile');


const pe = process.env;

const check_sanity=function() {
  if(_.isEmpty(pe.UI_SRC_PATH)){
    console.error(" -------------------------------------------------------------------")
    console.error("|        Environment variable UI_SRC_PATH must be set              |")
    console.error(" -------------------------------------------------------------------")
    process.exit();
  }
  if(_.isEmpty(pe.DRUMEE_DEV_USER)){
    pe.DRUMEE_DEV_USER=pe.USER;
  }
  if(_.isEmpty(pe.UI_BUILD_MODE)){
    pe.UI_BUILD_MODE=`devel`;
  }
  if(_.isEmpty(pe.UI_APP_PATH)){
    pe.UI_APP_PATH='/app';
  }
  if(_.isEmpty(pe.BUILD_MODE)){
    pe.BUILD_MODE = `devel`;
  }
}

const print_env=function() {
  console.log("Building  with HASH=[hash]\n",
  "UI_SRC_PATH.......... = " + pe.UI_SRC_PATH + "\n",
  "APP_PATH............. = " + pe.UI_APP_PATH + "\n",
  "UI_BUILD_PATH ....... = " + pe.UI_BUILD_PATH + "\n",
  "PUBLIC_PATH.......... = " + pe.UI_PUBLIC_PATH + "\n",
  "BUILD_MODE........... = " + pe.UI_BUILD_MODE + "\n"
  // "TEMPLATES_PATH ...... = " + pe.UI_TEMPLATES_PATH + "\n"
  )
}




class DrumeeSyncer {
  constructor(opt) {  
    this.options = opt || {};
  }
  apply(compiler) {
    compiler.hooks.done.tap('Drumee Sync Plugin', (
      stats /* stats is passed as argument when done hook is tapped.  */
    ) => {
      this.target = this.options.target;
      this.bundle_path = this.options.bundle_path;
      check_sanity();
      let data = this.get_hash(stats);
      if(this.target == 'api'){
        this.link_api(stats, data);
      }
      console.log("Building  with HASH=[hash]", data,  this.options)
    });
  }



  get_hash(stats) {
    console.log(`BUILDING FROM HASH=${stats.hash}`, stats.compiler);
    let o = this.options;
    let file = Path.resolve(o.bundle_path, "index.json");
    const { stdout } = Shell.exec("git log -1 --pretty=format:'%h:%H' --abbrev-commit", { silent: true });
    let [sep, short, long] = stdout.split(/[\':]/);
    let p = Jsonfile.readFileSync(Path.resolve(pe.UI_SRC_PATH, 'package.json'));
    //console.log("ZZZ", stdout, short, long);
    let data = {
      hash : stats.hash,
      timestamp : new Date().getTime(),
      head:long,
      rev:short,
      version:p.version
    }
    console.log(`Writing data into ${file} `, data);
    try{
      Jsonfile.writeFileSync(file, data);
      console.log(`RUNNING.... `, o);
    }catch(e){
      console.error(`GOT ERROR while trying to sync: \n`, e);
      return;
    }
    console.log(`Done.`);
    return data;
  }
}

module.exports = DrumeeSyncer;
