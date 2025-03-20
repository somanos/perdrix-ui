
const {
  radioButtons, footerWrapper, actionButtons, headerBox, dialogWrapper, entryLabel
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      customerHeader(ui),
      radioButtons(ui, {
        name: "site",
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
      }),
      entryLabel(ui, {label:"Description du travail", ico:"desktop_desksettings"}),
      actionButtons(ui, [
        {content:"Creer le devis", service:"create-quote"},
        {content:"Reserver le devis", service:"reserve-quote"},
      ])
    ]
  });


  const a = Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Ajouter un travail" }),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [body, footerWrapper(ui), dialogWrapper(ui)]
      })
    ]
  });

  return a;
};
