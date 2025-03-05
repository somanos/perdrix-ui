const Path    = require("path");
const _       = require("lodash");
const Shell   = require('shelljs');

const ui_home = '/srv/drumee/runtime/frontend/build';
const pe = process.env;
__check_sanity=function() {
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
  if(_.isEmpty(pe.UI_PUBLIC_PATH)){
    pe.UI_PUBLIC_PATH=`/${pe.DRUMEE_DEV_USER}/app`;
  }
  if(_.isEmpty(pe.UI_APP_PATH)){
    pe.UI_APP_PATH='/app';
  }
  if(_.isEmpty(pe.BUILD_MODE)){
    pe.BUILD_MODE = `devel`;
  }
  if(_.isEmpty(pe.UI_RUNTIME_DIR)){
    pe.UI_RUNTIME_DIR = `${ui_home}/${pe.DRUMEE_DEV_USER}`;
  }
}


__get_hash = function(c) {
  var fs = require('fs');
  const compiler = this;
  this.plugin("environment", function(stats){
    __check_sanity();
    __print_env();
  });

  this.plugin("afterEmit", function(stats){
    let dest_dir, command, remote;
    if(_.isEmpty(pe.UI_BUILD_PATH)){
      dest_dir = compiler.options.output.path;
      remote = `${pe.DRUMEE_DEV_USER}@${pe.DRUMEE_HOST}:${pe.UI_RUNTIME_DIR}`
      command = `${pe.UI_SRC_PATH}/sync/send.sh --from=${pe.UI_SRC_PATH} --to=${remote}`
      console.log(`BUILDING FROM LOCAL ${dest_dir} ---> ${remote}`);
    }
    else
    {
      dest_dir = pe.UI_BUILD_PATH
    }
    stream = fs.createWriteStream(Path.join(dest_dir, "/app.txt"));
    stream.write(stats.hash + "\n");
    stream.end();

    stream = fs.createWriteStream(Path.join(dest_dir, "/build-time.txt"));
    stream.write(new Date().getTime() + "\n");
    stream.end();
    if(!_.isEmpty(command)){
      Shell.exec(command);
    }
  });
}


__print_env=function() {
  console.log("Building XXX  with HASH=[hash]\n",
  "UI_SRC_PATH.......... = " + pe.UI_SRC_PATH + "\n",
  "UI_RUNTIME_DIR....... = " + pe.UI_RUNTIME_DIR + "\n",
  "APP_PATH............. = " + pe.UI_APP_PATH + "\n",
  "UI_BUILD_PATH ....... = " + pe.UI_BUILD_PATH + "\n",
  "PUBLIC_PATH.......... = " + pe.UI_PUBLIC_PATH + "\n",
  "BUILD_MODE........... = " + pe.UI_BUILD_MODE + "\n"
  // "TEMPLATES_PATH ...... = " + pe.UI_TEMPLATES_PATH + "\n"
  )
}
const __a = {
  check_sanity : __check_sanity,
  get_hash : __get_hash,
  print_env : __print_env,
}
module.exports = __a;


