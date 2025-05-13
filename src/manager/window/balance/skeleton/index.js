
const { topbarBox, menuItems } = require("../../../widget/skeleton")
/**
 * 
 * @param {*} ui 
 * @returns 
 */
function topbar(ui) {
  const figname = "topbar";
  const group = `${ui.fig.family}-${figname}`;
  let filters = [
    menuItems(ui, "Nom", _a.lastname),
    menuItems(ui, "Date", _a.ctime),
  ]
  return Skeletons.Box.G({
    className: `${group}__container`,
    sys_pn: "window-header",
    service: _e.raise,
    debug: __filename,
    kids: [
      // filterMenu(ui, filters),
      // searchbox(ui),
      topbarBox(ui, { title: "Liste des factures", mode: "sc" })
    ]
  });
};

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function main(ui) {
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
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function tabs(ui) {
  let pfx = ui.fig.family;

  let context = Skeletons.Wrapper.X({
    className: `${pfx}__tabs context`,
    sys_pn: "context-bar",
    dataset: {
      format: _a.auto
    }
  })
  return Skeletons.Box.Y({
    className: `${pfx}__tabs container`,
    kids: [context]
  })
};

module.exports = function (ui) {
  const header = Skeletons.Box.X({
    debug: __filename,
    className: `${ui.fig.family}__header ${ui.fig.group}__header`,
    sys_pn: "window-header",
    kidsOpt: {
      radio: _a.on,
      uiHandler: [ui]
    },
    kids: [topbar(ui)]
  });

  const dialog = Skeletons.Wrapper.Y({
    className: `${ui.fig.group}__wrapper--modal dialog__wrapper--modal ${ui.fig.family}`,
    name: "dialog"
  });

  const tooltips = Skeletons.Wrapper.Y({
    className: `${ui.fig.group}__wrapper-container`,
    name: "tooltips"
  });

  return Skeletons.Box.Y({
    className: `${ui.fig.family}__main ${ui.fig.group}__main drive-popup`,
    radio: _a.parent,
    debug: __filename,
    kids: [header, tooltips, main(ui), dialog]
  });
};
