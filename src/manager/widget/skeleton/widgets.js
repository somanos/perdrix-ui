
/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function list(ui, partName = _a.list, args) {
  let opt = {
    className: `${ui.fig.family}__searchbox`,
    innerClass: "drive-content-scroll",
    sys_pn: partName,
    flow: _a.none,
    uiHandler: null,
    spinnerWait: 1000,
    spinner: true,
    vendorOpt: Preset.List.Orange_e,
    ...args,
  }
  return Skeletons.List.Smart(opt);
};

/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
export function entry(ui, opt) {
  let { value, name, placeholder, sys_pn, currency = "" } = opt;
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
    dataset: { currency },
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
export function buttons(ui, opt = {}) {
  const { label, service } = opt;
  const pfx = `${ui.fig.family}`;
  let ok = Skeletons.Note({
    className: `${pfx}__button-go`,
    content: label || LOCALE.CREATE,
    uiHandler: [ui],
    service: service || _a.create,
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

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function actionButtons(ui, buttons) {
  const pfx = `${ui.fig.family}`;
  let uiHandler = [ui];
  let kids = [];
  let i = 0;
  for (let b of buttons) {
    kids.push(
      Skeletons.Note({
        className: `${pfx}__button-item`,
        ...b,
        position: i,
        uiHandler,
      })
    )
    i++;
  }

  return Skeletons.Box.X({
    className: `${pfx}__buttons-container`,
    sys_pn: "buttons",
    kids: Skeletons.Box.X({
      className: `${pfx}__buttons-main`,
      kids,
    })
  })
};

export function placeholder(ui, opt) {
  let { labels, service } = opt || {};
  labels = labels || [];
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__placehoder-main`,
    kids: [
      Skeletons.Note({
        className: `${ui.fig.family}__placeholder`,
        content: labels[0] || "Aucune correspondance trouvee."
      }),
      service ? Skeletons.Note({
        className: `${ui.fig.family}__placeholder button`,
        service: service || "prompt-location",
        content: labels[1] || "Faire une saisie manuelle",
        uiHandler: [ui]
      }) : Skeletons.Element()
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

/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
export function footerWrapper(ui, opt) {
  return Skeletons.Wrapper.Y({
    className: `${ui.fig.family}__footer`,
    sys_pn: _a.footer,
    kids: [list(ui)],
    state: 0,
    ...opt
  })
}

/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
export function dialogWrapper(ui, opt) {
  return Skeletons.Wrapper.Y({
    className: `${ui.fig.group}__wrapper--modal dialog__wrapper--modal ${ui.fig.family}__wrapper--modal`,
    name: "dialog",
    ...opt
  })
}

/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
export function descriptionEntry(ui, opt, extra) {

  let { value, name, placeholder, sys_pn, ico, label } = opt;
  placeholder = placeholder || label;
  const pfx = `${ui.fig.family}__entry-label`;
  let args = {
    className: `${pfx}__textarea ${name}`,
    name,
    value,
    formItem: name,
    innerClass: name,
    placeholder,
    uiHandler: [ui],
    type: _a.textarea
  }
  if (sys_pn) {
    args.sys_pn = sys_pn;
    args.partHandler = [ui];
  }
  let head = Skeletons.Box.G({
    className: `${pfx}__description-head ${name}`,
    kids: [
      Skeletons.Button.Label({
        ico,
        label,
        className: `${pfx}__title ${name}`
      }),
    ]
  });
  if (extra) head.kids.push(extra);
  return Skeletons.Box.Y({
    className: `${pfx}__main ${name}`,
    kids: [
      head,
      Skeletons.Entry(args)
    ]
  });
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function person(ui, type) {
  type = type || ui.mget(_a.type);
  const pfx = ui.fig.family;
  return Skeletons.Box.G({
    className: `${pfx}__entries-${type}`,
    kids: [
      menuInput(ui, {
        items: Env.get('genderList'),
        name: _a.gender,
        placeholder: LOCALE.GENDER,
        refAttribute: 'longTag',
        sys_pn: _a.gender,
        value: ui.mget(_a.gender) || "",
      }),
      entry(ui, {
        placeholder: LOCALE.LASTNAME,
        name: _a.lastname,
        sys_pn: _a.lastname,
        value: ui.mget(_a.lastname) || "",
      }),
      entry(ui, {
        placeholder: LOCALE.FIRSTNAME,
        name: _a.firstname,
        sys_pn: _a.firstname,
        value: ui.mget(_a.firstname) || "",
      }),
    ]
  })
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function company(ui) {
  let { type, custName, companyclass } = ui.model.toJSON();
  const pfx = ui.fig.family;
  return Skeletons.Box.G({
    className: `${pfx}__entries-${type}`,
    kids: [
      entry(ui, {
        placeholder: "Nom de la societe",
        name: 'companyname',
        sys_pn: "companyname",
        value: custName || "",
      }),
      menuInput(ui, {
        items: Env.get('companyClass'),
        name: 'companyclass',
        placeholder: "Type de societe",
        refAttribute: 'label',
        value: companyclass || "",
      }),
    ]
  })
}

export function messageBock(ui) {
  return Skeletons.Wrapper.Y({
    className: `${ui.fig.family}__message`,
    sys_pn: "message-block",
    state: 0,
  })
}