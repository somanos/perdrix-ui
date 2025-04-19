const { customerHeader, siteHeader } = require("../../../widget/skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function tabs(ui) {
  let pfx = ui.fig.family;
  let item = ui.fig.name;

  let main = siteHeader(ui)
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


export function contextBar(ui, buttons) {
  return Skeletons.Box.X({
    debug: __filename,
    className: `${ui.fig.family}__tabs content`,
    sys_pn: "works-selectors",
    kids: buttons
  });
}