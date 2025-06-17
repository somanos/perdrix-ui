
const { topbarBox } = require("../../../widget/skeleton")


module.exports = function (ui) {
  const menu = Skeletons.Box.X({
    debug: __filename,
    className: `${ui.fig.family}__header ${ui.fig.group}__header`,
    sys_pn: "window-header",
    kidsOpt: {
      radio: _a.on,
      uiHandler: ui
    },
    kids: topbarBox(ui, { title: "Liste des addresses", mode: "sc" }) //topbar(ui)
  });

  const a = require("../../skeleton/content")(ui, menu);
  return a;
};
