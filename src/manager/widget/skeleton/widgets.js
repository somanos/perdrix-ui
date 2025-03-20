
/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function list(ui) {
  return Skeletons.List.Smart({
    className: `${ui.fig.family}__searchbox`,
    innerClass: "drive-content-scroll",
    sys_pn: _a.list,
    flow: _a.none,
    uiHandler: null,
    spinnerWait: 1500,
    spinner: true,
    itemsOpt: {
      kind: 'customer_item',
      flow: _a.x,
      uiHandler: [ui]
    },
    vendorOpt: Preset.List.Orange_e,
  });
};

/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
export function entry(ui, opt) {
  let { value, name, placeholder, sys_pn } = opt;
  const pfx = `${ui.fig.family}__entry ${name}`;
  let args = {
    className: `${pfx} entry`,
    name,
    value,
    formItem: name,
    innerClass: name,
    mode: _a.interactive,
    service: _a.input,
    placeholder,
    uiHandler: [ui],
    errorHandler: [ui],
  }
  if (sys_pn) {
    args.sys_pn = sys_pn;
    args.partHandler = [ui];
  }
  return Skeletons.Entry(args)
}

/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
export function radioButtons(ui, opt) {
  return {
    ...opt,
    uiHandler: [ui],
    className: `${ui.fig.family}__category`,
    kind: 'radio_buttons',
  }
};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function buttons(ui) {
  const pfx = `${ui.fig.family}`;
  let ok = Skeletons.Note({
    className: `${pfx}__button-go`,
    content: LOCALE.CREATE,
    uiHandler: [ui],
    service: _a.create,
  })
  return Skeletons.Box.X({
    className: `${pfx}__buttons-container`,
    sys_pn: "buttons",
    id: `${ui._id}-button`,
    kids: Skeletons.Box.X({
      className: `${pfx}__buttons-main`,
      kids: [ok]
    })
  })
};

export function placeholder(ui) {
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__placehoder-main`,
    kids: [
      Skeletons.Note({
        className: `${ui.fig.family}__placeholder`,
        content: "Aucune correspondance trouvee."
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__placeholder button`,
        service: "prompt-location",
        content: "Faire une saisie manuelle",
        uiHandler: [ui]
      }),
    ]
  })
}

/**
 * 
 * @returns 
 */
export function menuInput(ui, opt) {
  const pfx = `${ui.fig.family}`;
  return {
    ...opt,
    kind: 'menu_input',
    className: `${pfx}__menu-input`,
    uiHandler: [ui]
  }
}
