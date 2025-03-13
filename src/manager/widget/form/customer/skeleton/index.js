
const { entry, namebox, category, list } = require("./entries")
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

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      category(ui),
      Skeletons.Box.Y({
        className: `${pfx}__entries-container`,
        kids: [
          Skeletons.Box.X({
            className: `${pfx}__namebox`,
            sys_pn: "namebox",
            kids: [namebox(ui, 'company')]
          }),
          entry(ui, { placeholder: "Adresse", name: _a.location }),
        ]
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
