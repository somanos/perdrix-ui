
const { entries, category, list } = require("./entries")
module.exports = function (ui) {
  const pfx = ui.fig.family;
  const header = Skeletons.Box.X({
    className: `${pfx}__header ${ui.fig.group}__header`,
    kids: [require('./topbar')(ui)],
    sys_pn: _a.header
  });

  const dialog = Skeletons.Wrapper.Y({
    className: `${ui.fig.group}__wrapper--modal dialog__wrapper--modal ${ui.fig.family}__wrapper--modal`,
    name: "dialog"
  });

  const selection = Skeletons.Wrapper.Y({
    className: `${ui.fig.family}__street-selection-container`,
    sys_pn: "street-selection"
  });

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      category(ui),
      selection,
      Skeletons.Box.Y({
        className: `${pfx}__entries-container`,
        sys_pn: "entries",
        kids: entries(ui)
      }),
    ]
  });


  const footer = Skeletons.Wrapper.Y({
    className: `${pfx}__footer`,
    sys_pn: _a.footer,
    kids: [list(ui)],
    state: 0
  });


  const a = Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      header,
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [body, footer, dialog]
      })
    ]
  });

  return a;
};
