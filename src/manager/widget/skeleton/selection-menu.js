function menuItem(ui, opt, innerClass) {
  let pfx = ui.fig.family;
  return Skeletons.Button.Label({
    className: `${pfx}__menu-item  ${innerClass}`,
    uiHandler: [ui],
    service: "item-selected",
    state: 0,
    radio:"selection-menu",
    ...opt,
    icons: ["raw-radio-unchecked", "raw-radio-checked"],
  });
}

export function selectionMenu(ui, opt) {
  let pfx = ui.fig.family;
  const { innerClass, label, itemName } = opt;
  const trigger = Skeletons.Button.Label({
    ico: "account",
    className: `${pfx}__menu-trigger ${innerClass}`,
    uiHandler: ui,
    sys_pn: "menu-trigger",
    label
  });
  const itemsList = Env.get('genderList')
  let _items = [];
  for (let item of itemsList) {
    item.name = itemName;
    _items.push(menuItem(ui, item, innerClass))
  }

  const items = Skeletons.Box.Y({
    className: `${pfx}__menu-items  ${innerClass}`,
    sys_pn: "filter-roll",
    kids: _items
  });

  const kids = {
    kind: KIND.menu.topic,
    className: `${pfx}__menu-main  ${innerClass}`,
    partHandler: ui,
    sys_pn: "selection-menu",
    trigger,
    items,
    uiHandler: ui,
    persistence:_a.none
  };

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__menu-container  ${innerClass}`,
    sys_pn: "filter-container",
    partHandler: ui,
    state: 0,
    kids
  });
};
