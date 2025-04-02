
const {
  entry, customerHeader, headerBox, dialogWrapper, footerWrapper
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      Skeletons.Box.Y({
        className: `${pfx}__entries-container`,
        sys_pn: "entries",
        kids: [
          entry(ui, {
            placeholder: "Adresse du chantier",
            name: _a.location,
            sys_pn: "address-entry"
          }),
        ]
      }),
      Skeletons.Wrapper.Y({
        className: `${pfx}__entries-manual`,
        sys_pn: "entries-manual",
        state: 0,
      }),
    ]
  });


  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Create a construction site" }),
      customerHeader(ui.source),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          footerWrapper(ui),
          dialogWrapper(ui)
        ]
      })
    ]
  });
};
