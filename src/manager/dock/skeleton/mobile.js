/**
 * 
 * @param {*} ui 
 * @returns 
 */
const __dock_widget_mobile_launchers = function (ui) {
  let menu;
  let profileType = 'pro';
  if (Visitor.isHubUser()) {
    profileType = _a.hub;
  }

  const pfx = ui.fig.family;
  const button_class = `${pfx}__button launcher ${profileType}`;
  const menuFig = `${pfx}`;

  const mobileLauncherTrigger = Skeletons.Button.Svg({
    ico: 'lines',
    className: `${button_class} mobile-launcher tbd ${profileType}`
  });

  const mobileLauncherItems = Skeletons.Box.X({
    className: `${menuFig}__docker-menu ${profileType}`,
    sys_pn: "dock-minifier-panel",
    kids: [
      require('./launcher')(ui)
    ]
  });

  const a = Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}__container mobile-launcher ${profileType}`,
    kids: [
      (menu = {
        kind: _t.menu.topic,
        className: `${menuFig}__mobile-launch-wrapper ${ui.fig.group}__mobile-launch-wrapper ${profileType}`,
        part: ui,
        debug: __filename,
        direction: _a.up,
        sys_pn: "dock-minifier-menu",
        opening: _e.flyover,
        persistance: _a.always,
        trigger: mobileLauncherTrigger,
        items: mobileLauncherItems,
        service: "go-to",
        uiHandler: ui
      })
    ]
  });

  return a;
};

module.exports = __dock_widget_mobile_launchers;
