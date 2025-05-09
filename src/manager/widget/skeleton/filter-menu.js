/**
 * 
 * @param {*} ui 
 * @param {*} label 
 * @param {*} name 
 * @returns 
 */
export function menuItems(ui, label, name) {
  return Skeletons.Button.Label({
    className: `menu-item`,
    label,
    uiHandler: [ui],
    service: _e.sort,
    name,
    state: 1,
    sys_pn: name,
    partHandler: [ui],
    icons: ["arrow-up", "arrow-down"]
  });
}


/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
export function filterMenu(ui, opt) {
  if (!opt) {
    opt = [
      menuItems(ui, "Nom", _a.name),
      menuItems(ui, "Date", _a.ctime),
    ]
  }
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
    kids: opt
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
}

/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
export function searchbox(ui, figname = "topbar") {
  return {
    kind: "search",
    flow: _a.x,
    className: `${ui.fig.family}-${figname}__searchbox`,
    placeholder: LOCALE.FILTER,
    listClass: "found-box",
    sys_pn: 'search-box',
    mode: _a.interactive,
    interactive: _a.service,
    service: _e.search,
    uiHandler: [ui],
    showError: false
  }
}