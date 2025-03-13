
/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
export function entry(ui, opt) {
  let { className, name, placeholder } = opt;
  className = 'entry';
  const pfx = `${ui.fig.family}__${className}`;
  return Skeletons.Box.X({
    className: `${pfx} main-entry`,
    kids: [
      Skeletons.Entry({
        className: `${pfx} entry`,
        name,
        formItem: name,
        innerClass: name,
        mode: _a.interactive,
        //interactive: _a.service,
        service: _a.input,
        placeholder,
        errorHandler: [ui]
      })
    ]
  });
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function namebox(ui) {
  const pfx = ui.fig.family;
  let type = ui.mget(_a.type)
  let kids;
  if (type == 'company') {
    kids = [
      entry(ui, { placeholder: "Nom de la societe", name: _a.name }),
    ]
  } else {
    kids = [
      entry(ui, { placeholder: "Nom", name: _a.lastname }),
      entry(ui, { placeholder: "Prenom", name: _a.firstname }),
    ]
  }
  return Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}__namebox-content`,
    kids
  });
};


export function list(ui) {
  return Skeletons.List.Smart({
    className: `${ui.fig.family}__searchbox`,
    innerClass: "drive-content-scroll",
    sys_pn: _a.list,
    flow: _a.none,
    uiHandler: null,
    itemsOpt: {
      kind: 'customer_item',
      flow: _a.x,
      uiHandler:[ui]
    },
    vendorOpt: Preset.List.Orange_e,
  });
};



export function category(ui) {
  let uiHandler = [ui];
  let type = ui.mget(_a.type)
  const pfx = `${ui.fig.family}`;
  let initialState = 0;
  if (type == 'company') {
    initialState = 1;
  }
  let company = Skeletons.Note({
    content: "Personne morale",
    uiHandler,
    type: 'company',
    service: "select-category",
    initialState,
    //state
  })
  let person = Skeletons.Note({
    content: "Personne physique",
    uiHandler,
    type: 'person',
    service: "select-category",
    //state: state ^ 1
  })
  return Skeletons.Box.X({
    className: `${pfx}__category-main`,
    kidsOpt: {
      className: `${pfx}__category-item`,
      radio: "category",
    },
    kids: [company, person]
  })
};
