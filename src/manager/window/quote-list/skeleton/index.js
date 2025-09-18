
const { topbarBox } = require("../../../widget/skeleton")
/**
 * 
 * @param {*} ui 
 * @returns 
 */
function topbar(ui) {
  const figname = "topbar";
  const group = `${ui.fig.family}-${figname}`;
  return Skeletons.Box.G({
    className: `${group}__container`,
    sys_pn: "window-header",
    service: _e.raise,
    debug: __filename,
    kids: [
      topbarBox(ui, { title: "Liste des devis", mode: "sc" })
    ]
  });
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
  let main = Skeletons.Box.Y({
    className: `${ui.fig.family}__body ${ui.fig.group}__body`,
    sys_pn: _a.content,
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
    kids: [header, tooltips, main, dialog]
  });
};
