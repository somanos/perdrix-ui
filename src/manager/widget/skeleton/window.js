const { customerHeader, siteHeader } = require(".")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function windowTabs(ui) {
  let pfx = ui.fig.family;

  let site = siteHeader(ui)
  let context = Skeletons.Wrapper.X({
    className: `${pfx}__tabs context`,
    sys_pn: "context-bar",
  })
  return Skeletons.Box.Y({
    className: `${pfx}__tabs container`,
    kids: [site, context]
  })
};



/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function windowMain(ui) {
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
    kids: [windowTabs(ui), list]
  });

};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function windowTopbar(ui) {
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


export function contextBar(ui, buttons) {
  return Skeletons.Box.X({
    debug: __filename,
    className: `${ui.fig.family}__tabs content`,
    sys_pn: "works-selectors",
    kids: buttons
  });
}