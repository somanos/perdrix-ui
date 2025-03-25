function menuItems(ui, opt) {
  let pfx = ui.fig.family;
  return Skeletons.Button.Label({
    className: `${pfx}__menu-item ${opt.service}`,
    uiHandler: ui,
    state: 0,
    icons: ["raw-radio-unchecked", "raw-radio-checked"],
    ...opt,
  });
}

export function selectionMenu(ui, opt) {
  let pfx = ui.fig.family;
  let { buttons, ico, label, service } = opt;
  const name = "menu";
  const trigger = Skeletons.Button.Label({
    className: `${pfx}__${name}-trigger`,
    ico,
    service,
    isTrigger: true,
    uiHandler: ui,
    label,
  })
  let content = []
  for (let b of buttons) {
    b.service = b.service || service;
    content.push(
      menuItems(ui, b)
    )
  }
  const items = Skeletons.Box.Y({
    className: `${pfx}__${name}-items`,
    sys_pn: `${name}-items`,
    kids: content
  });

  const kids = {
    kind: KIND.menu.topic,
    className: `${pfx}__${name}-main`,
    partHandler: ui,
    sys_pn: `${name}-main`,
    trigger,
    items,
    uiHandler: ui
  };

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__${name}-container`,
    kids
  });

};
