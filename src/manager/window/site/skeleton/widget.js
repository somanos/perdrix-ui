const { contextBar, menuItem } = require("../../../widget/skeleton")

/**
 * 
 * @param {*} ui 
 */
function tabs(ui, states = [0, 1]) {
  return Skeletons.Box.X({
    className: `${ui.fig.family}__buttons`,
    kidsOpt: {
      radio: _a.on,
      uiHandler: ui
    },
    kids: [
      Skeletons.Button.Label({
        className: `${ui.fig.family}__button-action regular`,
        ico: 'desktop_mysharing',
        label: 'Contacs',
        service: "load-context",
        name: 'pocs',
        state: states[0]
      }),
      Skeletons.Button.Label({
        className: `${ui.fig.family}__button-action regular`,
        ico: 'desktop_desksettings',
        label: 'Missions',
        name: 'works',
        service: "load-context",
        state: states[1]
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
    tabs(ui),
    Skeletons.Button.Label({
      className: `${ui.fig.family}__button-action add`,
      label: "Nouvelle mission",
      ico: "editbox_list-plus",
      icons: null,
      service: "create-work"
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
    tabs(ui, [1, 0]),
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


