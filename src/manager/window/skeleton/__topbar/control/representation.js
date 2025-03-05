// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *

// ===========================================================

// ===========================================================
const __topbar_control_representation = function(_ui_) {
  let state = 0;
  if (localStorage.viewMode === _a.row) {
    state = 1;
  }

  const view_ctrl = Skeletons.Button.Svg({
    ico       : "desktop_lineview",
    className : "icon ctrl-aspect",
    service   : 'change-view',
    sys_pn    : "view-ctrl",
    uiHandler : _ui_,
    state,
    icons     : [
      "desktop_lineview",
      "desktop_cells"
    ]});

  return view_ctrl;
};

module.exports = __topbar_control_representation;
