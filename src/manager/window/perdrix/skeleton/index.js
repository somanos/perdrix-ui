// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : desk/window/project-room/skeleton/main
//   TYPE : Skelton
// ==================================================================== *


module.exports = function(_ui_) {
  const menu = Skeletons.Box.X({
    debug     : __filename,
    className : `${_ui_.fig.family}__header ${_ui_.fig.group}__header`, 
    sys_pn    : "window-header",
    kidsOpt: {
      radio : _a.on,
      uiHandler    : _ui_
    },
    kids : [require('../../skeleton/topbar')(_ui_, LOCALE.LICENCES)]
  });

  const a = require("../../skeleton/content")(_ui_, menu);
  return a;
};
