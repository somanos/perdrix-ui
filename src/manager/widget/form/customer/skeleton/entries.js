const { selectionMenu, inputMenu } = require("../../../skeleton/selection-menu");

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
    uiHandler:[ui],
    errorHandler: [ui]
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
 * @returns 
 */
function _entries(ui) {
  let type = ui.mget(_a.type);
  let kids = [];
  switch (type) {
    case 'company':
      kids = [
        entry(ui, { placeholder: "Nom de la societe", name: _a.name }),
        entry(ui,
          { placeholder: "Adresse", name: _a.location, sys_pn: "address-entry" }),
      ]
      break;
    case 'person':
      const itemsList = Env.get('genderList');
      let label = LOCALE.GENDER;
      kids = [
        Skeletons.Box.G({
          className: `${ui.fig.family}__entries-${type}`,
          kids: [
            selectionMenu(ui,
              { itemsList, label, innerClass: "gender", itemName: "gender" }),
            entry(ui, { placeholder: "Nom", name: _a.lastname }),
            entry(ui, { placeholder: "Prenom", name: _a.firstname }),
          ]
        }),
        entry(ui,
          { placeholder: "Adresse", name: _a.location, sys_pn: "address-entry" }),
      ]
      break;
  }
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__entries-content`,
    kids
  })
};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function entries(ui) {
  return Skeletons.Box.X({
    debug: __filename,
    className: `${ui.fig.family}__entries-main`,
    kids: _entries(ui)
  })
};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function address(ui, opt) {
  const { street, city, housenumber, postcode } = opt;
  let type = "";
  if (street) type = street.split(/ +/)[0]
  // let streeType;
  // if (type) {
  //   streeType = entry(ui, {
  //     placeholder: "Type de voie", name: 'streettype', value: type
  //   });
  // } else {
  //   let itemsList = Env.get('streetType');
  //   let placeholder = "Type de voie"
  //   streeType = inputMenu(ui, {
  //     itemsList, placeholder, name: 'streetype', direction: _a.up
  //   })
  // }

  return Skeletons.Box.Y({
    className: `${ui.fig.family}__entries-container`,
    kids: [
      Skeletons.Box.Y({
        debug: __filename,
        className: `${ui.fig.family}__entries-main`,
        sys_pn: "address",
        kids: [
          Skeletons.Box.G({
            className: `${ui.fig.family}__address street`,
            kids: [
              entry(ui, { placeholder: "Numero", name: "housenumber", value: housenumber }),
              entry(ui, { placeholder: "Type de voie", name: 'streettype', value: type, sys_pn: "streettype" }),
              entry(ui, { placeholder: "Nom de voie", name: 'streetname', value: street }),
            ]
          }),
          Skeletons.Box.G({
            className: `${ui.fig.family}__address city`,
            kids: [
              entry(ui, { placeholder: "Code postal", name: 'postcode', value: postcode }),
              entry(ui, { placeholder: "Localite", name: 'city', value: city }),
            ]
          }),
        ]
      })
    ]
  })
};




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
