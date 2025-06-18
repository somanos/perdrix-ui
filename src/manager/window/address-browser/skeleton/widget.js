const { contextBar, customerHeader } = require("../../../widget/skeleton")

/**
 * 
 * @param {*} ui 
 */
function tabs(ui, states = [0, 1]) {
  let pfx = ui.fig.family;
  return Skeletons.Box.X({
    className: `${pfx}__tab`,
    kidsOpt: {
      radio: `radion-${ui._id}`,
      uiHandler: ui,
      //service: "load-context",
    },
    kids: [
      Skeletons.Note({
        className: `${pfx}__button-action regular`,
        // ico: 'desktop_mysharing',
        content: 'Clients',
        service: 'load-customer',
        state: states[0]
      }),
      Skeletons.Note({
        className: `${pfx}__button-action regular`,
        // ico: 'desktop_mysharing',
        content: 'Missions',
        service: 'load-mission',
        state: states[1]
      }),
      Skeletons.Note({
        className: `${pfx}__button-action regular`,
        // ico: 'desktop_mysharing',
        content: 'Factures',
        service: 'load-bill',
        state: states[2]
      }),
      Skeletons.Note({
        className: `${pfx}__button-action regular`,
        // ico: 'desktop_mysharing',
        content: 'Devis',
        service: 'load-quote',
        state: states[3]
      }),
      Skeletons.Note({
        className: `${pfx}__button-action regular`,
        // ico: 'desktop_desksettings',
        content: 'Notes',
        service: 'load-note',
        state: states[4]
      }),
      Skeletons.Note({
        className: `${pfx}__button-action regular`,
        // ico: 'desktop_desksettings',
        content: 'Contacts',
        service: 'load-poc',
        state: states[5]
      }),
    ]
  })

}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function main(ui) {
  let pfx = ui.fig.family;
  let list = Skeletons.List.Smart({
    className: `${pfx}__list-content`,
    innerClass: "drive-content-scroll",
    sys_pn: _a.list,
    vendorOpt: Preset.List.Orange_e,
  });

  let context = Skeletons.Wrapper.X({
    className: `${pfx}__tabs context`,
    sys_pn: "context-bar",
    kids:[tabs(ui)]
  })

  return Skeletons.Box.Y({
    className: `${pfx}__main ${ui.fig.group}__main`,
    radio: _a.parent,
    debug: __filename,
    kids: [context, list]
  });

};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function topbar(ui) {
  const figname = "topbar";
  const group = `${ui.fig.group}-${figname}`;
  let container = Skeletons.Box.X({
    className: `${group}__container ${ui.mget(_a.type)}`,
    service: _e.raise,
    debug: __filename,
    kids: [
      Skeletons.Box.X({
        className: `${group}__title ${ui.fig.family}-${figname}__title`,
        kids: customerHeader(ui),
      }),
      Skeletons.Window.TopbarControl(ui, "sc")
    ]
  });

  return Skeletons.Box.X({
    debug: __filename,
    className: `${ui.fig.family}__header ${ui.fig.group}__header`,
    sys_pn: "window-header",
    kidsOpt: {
      radio: _a.on,
      uiHandler: ui
    },
    kids: [container]
  });
};


// /**
//  * 
//  * @param {*} ui 
//  * @returns 
//  */
// export function customerTab(ui) {
//   let buttons = [tabs(ui, [1, 0, 0, 0, 0])]
//   return contextBar(ui, buttons)
// };


// /**
//  * 
//  * @param {*} ui 
//  * @returns 
//  */
// export function missionTab(ui) {
//   let buttons = [tabs(ui, [0, 1, 0, 0, 0, 0])]
//   return contextBar(ui, buttons)
// };


// /**
//  * 
//  * @param {*} ui 
//  * @returns 
//  */
// export function billTab(ui) {
//   let buttons = [tabs(ui, [0, 0, 1, 0, 0, 0])]
//   return contextBar(ui, buttons)
// };


// /**
//  * 
//  * @param {*} ui 
//  * @returns 
//  */
// export function quoteTab(ui) {
//   let buttons = [tabs(ui, [0, 0, 0, 1, 0, 0])]
//   return contextBar(ui, buttons)
// };


// /**
//  * 
//  * @param {*} ui 
//  * @returns 
//  */
// export function noteTab(ui) {
//   let buttons = [tabs(ui, [0, 0, 0, 0, 1, 0])]
//   return contextBar(ui, buttons)
// };


// /**
//  * 
//  * @param {*} ui 
//  * @returns 
//  */
// export function pocTab(ui) {
//   let buttons = [tabs(ui, [0, 0, 0, 0, 0, 1])]
//   return contextBar(ui, buttons)
// };


