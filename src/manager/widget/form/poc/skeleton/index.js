
const {
  list, entry, customerHeader, headerBox, dialogWrapper, actionButtons, radioButtons
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
          radioButtons(ui, {
            name: "choice",
            service: "select-site",
            buttons: [
              { label: "Meme addresse", state: 1, value: "same-address" },
              { label: "Choisir un chantier", state: 0, value: "list-sites" },
              { label: "Ajouter un chantier", state: 0, value: "add-site" },
            ],
          }),
          Skeletons.Wrapper.Y({
            className: `${pfx}__entries-manual`,
            sys_pn: "entries-manual",
            kids: [list(ui)],
            state: 0,
          }),
          Skeletons.Wrapper.Y({
            className: `${pfx}__site-address`,
            sys_pn: "site-address",
            state: 0,
          }),
          Skeletons.Box.X({
            kids: [entry(ui, {
              placeholder: "Email",
              name: _a.email,
              sys_pn: _a.email
            })]
          }),
          Skeletons.Box.X({
            kids: [entry(ui, {
              placeholder: "Bureau",
              name: "office",
              sys_pn: "office",
            }),
            entry(ui, {
              placeholder: "Domicile",
              name: _a.home,
              sys_pn: _a.home,
            }),
            entry(ui, {
              placeholder: "Portable",
              name: _a.mobile,
              sys_pn: _a.mobile,
            }),
            entry(ui, {
              placeholder: "Fax",
              name: "fax",
              sys_pn: "fax",
            }),
            ]
          })
        ]
      }),
    ]
  });


  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Ajouter contact chantier" }),
      customerHeader(ui),
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
