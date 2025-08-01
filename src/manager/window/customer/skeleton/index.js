const { topbarBox } = require("../../../widget/skeleton")

module.exports = function (ui) {
  const { main, topbar } = require("./widget")

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
    kids: [topbar(ui), tooltips, main(ui), dialog]
  });

};
