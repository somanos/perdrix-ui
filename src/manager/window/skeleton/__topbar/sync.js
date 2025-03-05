// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *

// ===========================================================
//
// ===========================================================
const __topbar_breadcrumbs = function(_ui_) {

  const name = "sync-option";

  const trigger = Skeletons.Button.Icon({
    ico       : "sync-new",
    className : `${_ui_.fig.group}-${name}__icon ${_ui_.fig.group}-${name}__arrow ml-12`,
    uiHandler : _ui_, 
    state     : 0
  }, {
    width   : 20,
    height  : 20,
    padding : 5
  });

  const items = Skeletons.List.Smart({
    className   : `${_ui_.fig.group}-${name}__roll`,
    sys_pn      : "sync-roll",
    styleOpt    : {
      width     : 150
    },
    partHandler : _ui_,
    autoHeight  : Preset.List.y36_36_216,
    vendorOpt   : Preset.List.Orange_e
  });

  const menu = { 
    kind      : _t.menu.topic,
    className : `${_ui_.fig.group}-${name}__main`,
    part      : _ui_, 
    debug     : __filename, 
    sys_pn    : "sync-options",
    opening   : _e.flyover,
    trigger,
    items,
    uiHandler : _ui_
  };

  const a = Skeletons.Box.Y({
    debug       : __filename, 
    className   : `${_ui_.fig.group}-${name}__container`,
    sys_pn      : "sync-container",
    partHandler : _ui_,
    state       : 0,
    kids : [menu]});

  return a;
};
module.exports = __topbar_breadcrumbs;
