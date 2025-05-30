const { contextBar, menuItem } = require("../../../widget/skeleton")

/**
 * 
 * @param {*} ui 
 */
function tabs(ui, states = [0, 1]) {
  return Skeletons.Box.X({
    className: `${ui.fig.family}__buttons`,
    kidsOpt: {
      radiotoggle: _a.parent,
      uiHandler: ui,
      service: "load-context",
    },
    kids: [
      Skeletons.Note({
        className: `${ui.fig.family}__button-action regular`,
        // ico: 'desktop_mysharing',
        content: 'Transfert',
        name: 'transfer',
        state: states[0]
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__button-action regular`,
        // ico: 'desktop_mysharing',
        content: 'Devis',
        name: 'quote',
        state: states[1]
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__button-action regular`,
        // ico: 'desktop_mysharing',
        content: 'Factures',
        name: 'bill',
        state: states[2]
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__button-action regular`,
        // ico: 'desktop_mysharing',
        content: 'Contacs',
        name: 'poc',
        state: states[3]
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__button-action regular`,
        // ico: 'desktop_desksettings',
        content: 'Missions',
        name: 'work',
        state: states[4]
      }),
    ]
  })
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function workTab(ui) {
  let service = 'filter-works';
  let buttons = [
    menuItem(ui, { sys_pn: "fdate", label: "Par date", name: 'ctime', state: 0, service }),
    tabs(ui, [0, 0, 0, 0, 1]),
    Skeletons.Button.Label({
      className: `${ui.fig.family}__button-action add`,
      label: "Nouvelle mission",
      ico: "editbox_list-plus",
      icons: null,
      service: "create-mission"
    }),
  ]
  return contextBar(ui, buttons)
};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function pocTab(ui) {
  let buttons = [
    tabs(ui, [0, 0, 0, 1, 0]),
    Skeletons.Button.Label({
      className: `${ui.fig.family}__button-action add`,
      label: "Nouveau contact",
      ico: "editbox_list-plus",
      icons: null,
      service: "create-poc"
    }),
  ]
  return contextBar(ui, buttons)
};


/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function quoteTab(ui) {
  let buttons = [
    Skeletons.Box.X({
      className: `${ui.fig.family}__salesbox`,
      sys_pn: "salesbox",
      partHandler:[ui]
    }),
    tabs(ui, [0, 1, 0, 0, 0])
  ]
  return contextBar(ui, buttons)
};


/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function billTab(ui) {
//  let buttons = [tabs(ui, [0, 0, 1, 0, 0])]
  let buttons = [
    Skeletons.Box.X({
      className: `${ui.fig.family}__salesbox`,
      sys_pn: "salesbox",
      partHandler:[ui]
    }),
    tabs(ui, [0, 0, 1, 0, 0])
  ]
  return contextBar(ui, buttons)
};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function transferTab(ui) {
  let buttons = [tabs(ui, [1, 0, 0, 0, 0])]
  return contextBar(ui, buttons)
};


