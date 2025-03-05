/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *


const __button = function(_ui_, k){
  const a = { 
    f : require("./fullscreen")(_ui_),
    v : require("./representation")(_ui_),
    s : require("./sizing")(_ui_),
    c : require("./close")(_ui_),
    m : require("./minimize").default(_ui_)
  };
  return a[k] || Skeletons.Box.X(_ui_);
};

const __topbar_control = function(_ui_, mode) {
  if (mode == null) { mode = "vmsc"; }
  const a =  Skeletons.Box.X({
    debug     : __filename,
    className : `${_ui_.fig.group}-topbar__control ${_ui_.fig.family}-topbar__control`,
    kids : []});

  const m = new RegExp(`[${mode}]`);
  for (let n of Array.from(mode.split(''))) {
    //this.debug("AAAAAAAAAA 24", m, n)
    if (m.test(n)) {
      a.kids.push(__button(_ui_, n));
    }
  }

  return a;
};

module.exports = __topbar_control;
