
const {
  list, customerHeader, siteSelector, actionButtons,
  headerBox, messageBock, descriptionEntry
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      Skeletons.FileSelector({
        partHandler: ui,
      }),
      //siteSelector(ui),
      // Skeletons.Note({
      //   className: `${pfx}__select-work`,
      //   content: "Associer a un travail",
      //   uiHandler: [ui],
      //   service: 'select-work',
      // }),
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
      descriptionEntry(ui, {
        label: "Description",
        ico: "desktop_desksettings",
        name: "description",
        sys_pn: "description",
      }),
      messageBock(ui)
    ]
  });


  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Creer une note" }),
      customerHeader(ui),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          actionButtons(ui, [
            { service: _a.create, content: "Creer la note", state: 0, sys_pn:"go-btn" },
            { service: 'list-works', content: "Selectionner le travail" }
          ]),
        ]
      })
    ]
  });
};
