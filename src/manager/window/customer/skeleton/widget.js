const { customerHeader } = require("../../../widget/skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function tabs(ui) {
  let pfx = ui.fig.family;
  let item = ui.fig.name;

  let main = Skeletons.Box.X({
    className: `${pfx}__tabs main`,
    kidsOpt: {
      radio: `${ui.cid}-tabs`,
      labelClass: `${item}__label contacts`,
      service: "load-context"
    },
    kids: [
      Skeletons.Note({
        className: `${item}__button`,
        content: 'Chantiers',
        name: 'site',
      }),
      Skeletons.Box.X({
        className: `${item}__button-container`,
        state: 1,
        uiHandler: [ui],
        name: 'work',
        kids: [
          Skeletons.Note({
            className: `${item}__button`,
            content: 'Missions',
            active: 0
          }),
          Skeletons.Button.Svg({
            className: `${item}__icon`,
            ico: 'editbox_list-plus',
            uiHandler: [ui],
            service: "create-mission"
          })
        ],
      }),
      Skeletons.Note({
        className: `${item}__button`,
        content: 'Devis',
        name: 'quote',
      }),
      Skeletons.Note({
        className: `${item}__button`,
        content: 'Factures',
        name: 'bill',
      }),
    ]
  });

  let context = Skeletons.Wrapper.X({
    className: `${pfx}__tabs context`,
    sys_pn: "context-bar",
  })
  
  return Skeletons.Box.Y({
    className: `${pfx}__tabs container`,
    kids: [main, context]
  })
};



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

