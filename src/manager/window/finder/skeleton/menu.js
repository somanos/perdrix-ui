function menuItems(ui, label, ctype) {
  return Skeletons.Button.Label({
    className: `menu-item`,
    label,
    uiHandler: ui,
    service: _a.filter,
    ctype,
    state: 1,
    icons: ["raw-radio-unchecked", "raw-radio-checked"]
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
      menuItems(ui, "Client", "customer"),
      menuItems(ui, "Chantier", "site"),
      menuItems(ui, "Contact Chantier", "poc"),
      menuItems(ui, "Missions", "work"),
    ]
  });

  const kids = {
    kind: KIND.menu.topic,
    className: `${pfx}-${name}__menu`,
    partHandler: ui,
    sys_pn: _a.filter,
    //opening: _e.flyover,
    trigger,
    items,
    service: "go-to",
    uiHandler: ui
  };

  const a = Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}-${name}__container`,
    sys_pn: "filter-container",
    partHandler: ui,
    state: 0,
    kids
  });


  return a;
};
module.exports = filterSelector;
