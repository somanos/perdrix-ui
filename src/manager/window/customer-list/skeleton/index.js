
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
      topbarBox(ui, { title: "Liste des clients", mode: "sc" })
    ]
  });
}

module.exports = function (_ui_) {
  const menu = Skeletons.Box.X({
    debug: __filename,
    className: `${_ui_.fig.family}__header ${_ui_.fig.group}__header`,
    sys_pn: "window-header",
    kidsOpt: {
      radio: _a.on,
      uiHandler: _ui_
    },
    kids: topbar(_ui_)
  });

  const a = require("../../skeleton/content")(_ui_, menu);
  return a;
};
