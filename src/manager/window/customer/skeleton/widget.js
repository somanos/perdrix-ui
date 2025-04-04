const { customerHeader, selectionMenu } = require("../../../widget/skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function tabs(ui) {
  let pfx = ui.fig.family;
  let item = ui.fig.name;
  let service = "show-works";
  let state = 1;
  let status = null;
  let works = selectionMenu(ui, {
    label: 'Travaux',
    ico: 'desktop_desksettings',
    service,
    buttons: [
      { label: "Travaux (0)", status: 0, state },
      { label: "Travaux (1)", status: 1, state },
      { label: "Travaux (2)", status: 2, state },
      { label: "Travaux (3)", status: 3, state },
      { label: "Travaux (4)", status: 4, state },
      { label: "Creer", ico: "editbox_list-plus", 
        icons: null, service: "create-work" },
    ]
  })

  return Skeletons.Box.X({
    className: `${pfx}__tabs`,
    kidsOpt: {
      className: `${item}__button`,
      radio: `${ui.cid}-tabs`,
      labelClass: `${item}__label contacts`,
    },
    kids: [
      Skeletons.Button.Label({
        ico: 'desktop_mysharing',
        label: 'Contacs',
        service: 'show-pocs',
      }),
      Skeletons.Button.Label({
        ico: 'desktop_picture',
        label: 'Photos',
        service: 'show-photos',
      }),
      Skeletons.Button.Label({
        ico: 'editbox_pencil',
        label: 'Notes',
        service: 'show-notes',
      }),
      works,
      Skeletons.Button.Label({
        ico: 'editbox_openmenu',
        label: 'Solde',
        service: 'show-solde',
      }),
    ]
  });
};


/**
 * 
 * @param {*} ui 
 * @returns 
 */
// export function placeholder(ui) {
//   return Skeletons.Box.Y({
//     className: `${ui.fig.family}__placehoder-main`,
//     kids: [
//       Skeletons.Note({
//         className: `${ui.fig.family}__placeholder`,
//         content: "Aucun travail encours."
//       }),
//       Skeletons.Note({
//         className: `${ui.fig.family}__placeholder button`,
//         service: "create-quote",
//         content: "Saisir un devis",
//         uiHandler: [ui]
//       }),
//     ]
//   })
// }


/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function main(ui) {
  let list = Skeletons.List.Smart({
    className: `${ui.fig.family}__list-content`,
    innerClass: "drive-content-scroll",
    sys_pn: _a.list,
    vendorOpt: Preset.List.Orange_e,
  });

  return Skeletons.Box.Y({
    className: `${ui.fig.family}__main ${ui.fig.group}__main`,
    radio: _a.parent,
    debug: __filename,
    kids: [tabs(ui), list]
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
        kids: customerHeader(ui), //require("./overview")(ui)
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
};;
