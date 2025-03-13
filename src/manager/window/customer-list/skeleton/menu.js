function menuItems(ui, label, name) {
  return Skeletons.Button.Label({
    className: `menu-item`,
    label,
    uiHandler: ui,
    service: _e.sort,
    name,
    state: 1,
    icons: ["arrow-up", "arrow-down"]
  });

}

function filterSelector(ui) {
  let pfx = ui.fig.family;
  const name = "topbar__filter";
  const trigger = Skeletons.Button.Icon({
    ico: "desktop_filter",
    className: `${pfx}-${name}__menu-trigger`,
    uiHandler: ui,
    sys_pn: "filter-button",
    state: 1,
  });

  const items = Skeletons.Box.Y({
    className: `${pfx}-${name}__menu-items`,
    sys_pn: "filter-roll",
    kids: [
      menuItems(ui, "Nom", _a.name),
      menuItems(ui, "Date", _a.ctime),
    ]
  });

  const kids = {
    kind: KIND.menu.topic,
    className: `${pfx}-${name}__menu`,
    partHandler: ui,
    sys_pn: _a.filter,
    trigger,
    items,
    uiHandler: ui
  };

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}-${name}__container`,
    sys_pn: "filter-container",
    partHandler: ui,
    state: 0,
    kids
  });


};
module.exports = filterSelector;
