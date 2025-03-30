
const {
  entry, customerHeader, headerBox, dialogWrapper, actionButtons
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
          Skeletons.Box.X({
            kids: [entry(ui, {
              placeholder: "Email",
              name: _a.email,
            })]
          }),
          Skeletons.Box.X({
            kids: [entry(ui, {
              placeholder: "Bureau",
              name: "office",
            }),
            entry(ui, {
              placeholder: "Domicile",
              name: _a.home,
            }),
            entry(ui, {
              placeholder: "Portable",
              name: _a.mobile,
            }),
            entry(ui, {
              placeholder: "Fax",
              name: "fax",
            }),
            ]
          })
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
      headerBox(ui, { title: "Ajouter contact chantier" }),
      customerHeader(ui.source),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          actionButtons(ui, [{ service: _a.create, content: LOCALE.CREATE }]),
          dialogWrapper(ui)
        ]
      })
    ]
  });
};
