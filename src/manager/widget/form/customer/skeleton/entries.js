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
 * @returns 
 */
function _entries(ui) {
  let type = ui.mget(_a.type);
  let kids = [];
  const pfx = ui.fig.family;
  switch (type) {
    case 'company':
      kids = [
        Skeletons.Box.G({
          className: `${pfx}__entries-${type}`,
          kids: [
            entry(ui, {
              placeholder: "Nom de la societe",
              name: 'companyname',
              sys_pn: "companyname"
            }),
            menu_input(ui, {
              items: Env.get('companyClass'),
              name: 'companyclass',
              placeholder: "Type de societe",
              refAttribute: 'label',
              value: "",
            }),
          ]
        }),
        entry(ui, {
          placeholder: "Adresse",
          name: _a.location,
          sys_pn: "address-entry"
        }),
      ]
      break;
    case 'person':
      kids = [
        Skeletons.Box.G({
          className: `${pfx}__entries-${type}`,
          kids: [
            menu_input(ui, {
              items: Env.get('genderList'),
              name: 'gender',
              placeholder: LOCALE.GENDER,
              refAttribute: 'longTag',
              value: "",
            }),
            entry(ui, {
              placeholder: "Nom",
              name: _a.lastname,
              sys_pn: _a.lastname,
            }),
            entry(ui, { placeholder: "Prenom", name: _a.firstname }),
          ]
        }),
        entry(ui, {
          placeholder: "Adresse",
          name: _a.location,
          sys_pn: "address-entry"
        }),
      ]
      break;
  }
  return Skeletons.Box.Y({
    className: `${pfx}__entries-content`,
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
 * @returns 
 */
function menu_input(ui, opt) {
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
 * @returns 
 */
export function address(ui, opt) {
  const { street, city, housenumber, postcode, countrycode } = opt;
  const pfx = `${ui.fig.family}`;
  let type = "";
  if (street) type = street.split(/ +/)[0];

  let streetType = menu_input(ui, {
    items: Env.get('streetType'),
    name: 'streettype',
    placeholder: "Type de voie",
    refAttribute: 'longTag',
    value: type,
  })

  let country = menu_input(ui, {
    items: Env.get('countryCode'),
    name: 'countrycode',
    refAttribute: 'countrycode',
    placeholder: "Pays",
    value: countrycode || 'France',
  })

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__entries-main`,
    sys_pn: "address",
    kids: [
      Skeletons.Box.G({
        className: `${pfx}__address street`,
        kids: [
          entry(ui, { placeholder: "Numero", name: "housenumber", value: housenumber }),
          streetType,
          entry(ui, { placeholder: "Nom de voie", name: 'streetname', value: street }),
        ]
      }),
      Skeletons.Box.G({
        className: `${pfx}__address additional`,
        kids: [
          Skeletons.Element(),
          entry(ui, { placeholder: "Complenent!", name: 'additional' }),
        ]
      }),
      Skeletons.Box.G({
        className: `${pfx}__address city`,
        kids: [
          entry(ui, {
            placeholder: "Code postal",
            name: 'postcode',
            value: postcode,
            sys_pn: "postcode",
          }),
          entry(ui, {
            placeholder: "Localite",
            name: 'city',
            sys_pn: "city",
            value: city
          }),
          country
        ]
      }),
      buttons(ui)
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
  })
  let person = Skeletons.Note({
    content: "Personne physique",
    uiHandler,
    type: 'person',
    service: "select-category",
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
