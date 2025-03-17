/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @param {*} innerClass 
 * @returns 
 */
function menuItem(ui, opt, innerClass) {
  let pfx = ui.fig.family;
  return Skeletons.Button.Label({
    className: `${pfx}__menu-item  ${innerClass}`,
    uiHandler: [ui],
    service: "item-selected",
    state: 0,
    radio: "selection-menu",
    ...opt,
    icons: ["raw-radio-unchecked", "raw-radio-checked"],
  });
}


/**
 * 
 */
function buildMenu(ui, trigger, opt) {
  let pfx = ui.fig.family;
  const { innerClass, itemName, itemsList, direction } = opt;
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

  return {
    kind: KIND.menu.topic,
    className: `${pfx}__menu-main  ${innerClass}`,
    partHandler: ui,
    sys_pn: "selection-menu",
    trigger,
    direction,
    items,
    uiHandler: ui,
    persistence: _a.none
  };

}

export function selectionMenu(ui, opt) {
  let pfx = ui.fig.family;
  const { innerClass, label } = opt;
  const trigger = Skeletons.Button.Label({
    ico: "account",
    className: `${pfx}__menu-trigger ${innerClass}`,
    uiHandler: ui,
    sys_pn: "menu-trigger",
    label
  });

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__menu-container  ${innerClass}`,
    sys_pn: "filter-container",
    partHandler: ui,
    state: 0,
    kids: buildMenu(ui, trigger, opt)
  });
};

export function inputMenu(ui, opt) {
  let pfx = ui.fig.family;
  const { innerClass, name, value, placeholder, sys_pn } = opt;
  let args = {
    className: `${pfx} entry`,
    name,
    value,
    formItem: name,
    innerClass: name,
    mode: _a.interactive,
    service: "input-menu",
    placeholder,
    errorHandler: [ui]
  }
  if (sys_pn) {
    args.sys_pn = sys_pn;
    args.partHandler = [ui];
  }

  const trigger = Skeletons.Entry(args);

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__menu-container  ${innerClass}`,
    sys_pn: "filter-container",
    partHandler: ui,
    state: 0,
    kids: buildMenu(ui, trigger, opt)
  });

}