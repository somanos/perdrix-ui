const __window_topbar_action=function(){

  const settings_menu = { 
    kind        : _t.menu.topic,
    className   : `${pfx}__menu left`,
    persistence : _a.once,
    opening     : _e.click,
    flow        : _a.x,
    axis        : _a.x, 
    sys_pn      : 'menu-settings',
    opening     : _e.click,
    direction   : _a.right,
    trigger     : Skeletons.Button.Svg({
      ico       : 'desktop_desksettings',
      className : `${pfx}__icon settings`
    }),
    items       : require("desk/skeleton/common/topbar/settings")(_ui_)
  };

  return a; 
};

module.exports = __window_topbar_action;

