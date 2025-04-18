
const {
  siteSelector, list, customerHeader, actionButtons,
  headerBox, messageBock, descriptionEntry, menuInput
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      siteSelector(ui),
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
      descriptionEntry(ui,
        {
          label: "Description du travail",
          ico: "desktop_desksettings",
          name: "description",
          sys_pn: "description",
        },
        menuInput(ui, {
          items: Env.get('workType'),
          name: 'category',
          placeholder: 'Type de travail',
          refAttribute: 'label',
          value: "",
        })
      ),
      messageBock(ui),
    ]
  });


  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Creer un travail" }),
      customerHeader(ui),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          actionButtons(ui, [
            { content: "Creer le travail", service: "create-work", sys_pn: "button-work" },
            { content: "Creer le devis", service: "create-quote" },
            // { content: "Reserver le devis", service: "reserve-quote" },
          ])
        ]
      })
    ]
  });
};
