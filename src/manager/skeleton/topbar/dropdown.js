
var __desk_top_bar_user_menu, __menu_items;

__menu_items = function(_ui_) {
  var a, pfx;
  pfx = _ui_.fig.family + "__topbar-user";
  a = Skeletons.Box.Y({
    debug: __filename,
    className: "c-top-bar__menu-inner " + pfx,
    styleOpt: {
      width: 195
    },
    flow: _a.vertical,
    kids: [
      Skeletons.Button.Label({
        ico: 'desktop_account--white',
        className: pfx + "--item account",
        label: LOCALE.MY_ACCOUNT,
        service: _e.launch,
        respawn: 'window_account'
      }), 
      // Visitor.domainCan(_K.permission.admin_view) ? Skeletons.Button.Label({
      //   ico: 'user-settings',
      //   className: pfx + "--item admin-panel",
      //   label: LOCALE.ADMIN,
      //   service: _e.launch,
      //   respawn: 'window_adminpanel'
      // }) : void 0
      , Skeletons.Button.Label({
        ico: 'desktop_questionmark',
        className: pfx + "--item helpdesk",
        label: LOCALE.HELPDESK,
        service: _e.launch,
        respawn: 'window_helpdesk'
      }), Skeletons.Button.Label({
        ico: 'desktop_disconnect',
        className: pfx + "--item disconnect",
        label: LOCALE.DISCONNECT,
        on_click: Cop.logout
      })
    ]
  });
  return a;
};

__desk_top_bar_user_menu = function(_ui_) {
  var a, overlay;
  overlay = Skeletons.Box.X({
    className: _ui_.fig.family + "__topbar-overlay"
  });
  a = Skeletons.Box.X({
    className: _ui_.fig.family + "__topbar-user-dropdown",
    debug: __filename,
    kids: [
      {
        kind: "menu_topic",
        className: "c-top-bar__menu-items-block c-top-bar__menu-items-block--right-side u-jc-center",
        flow: _a.y,
        opening: _e.click,
        service: "user-menu",
        sys_pn: "user-dropdown",
        persistence: _a.once,
        trigger: overlay,
        items: __menu_items(_ui_),
        offsetY: 20
      }
    ]
  });
  return a;
};
  
  module.exports = __desk_top_bar_user_menu;
  