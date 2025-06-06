
const {
  cartridge, list, customerHeader, actionButtons,
  headerBox, messageBock, descriptionEntry, menuInput
} = require("../../../skeleton")

module.exports = function (ui, orphanedNumbers) {
  const pfx = ui.fig.family;
  let { workId, site, description } = ui.model.toJSON()

  let siteView;
  if (site) {
    siteView = {
      ...site,
      type: 'site',
      kind: 'location_view',
      state: 1
    }
  }

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      Skeletons.Wrapper.Y({
        className: `${pfx}__entries-manual`,
        sys_pn: "entries-manual",
        kids: [list(ui)],
        state: 0,
      }),
      Skeletons.Wrapper.Y({
        className: `${pfx}__site-address`,
        sys_pn: "site-address",
        kids: [
          siteView
        ]
      }),
      Skeletons.Box.G({
        className: `${pfx}__description-container`,
        kids: [
          descriptionEntry(ui,
            {
              label: "Description de la facture",
              ico: "desktop_desksettings",
              name: "description",
              sys_pn: "description",
              value: description
            },
            menuInput(ui, {
              items: Env.get('billType'),
              name: 'category',
              placeholder: 'Type de facture',
              refAttribute: 'label',
              sys_pn: "category",
              value: "",
            }),
          ),
          Skeletons.Box.Y({
            className: `${pfx}__main bill-cartridge`,
            kids: [
              menuInput(ui, {
                items: orphanedNumbers,
                className: `bill-number`,
                name: 'chrono',
                placeholder: 'Réutiliser un numéro',
                refAttribute: 'label',
                sys_pn: "bill-number",
                service: "reuse-old-bill",
                uiHandler: [ui],
                value: "",
              }),
              cartridge(ui, {
                content: "Montant HT",
              }, {
                name: 'ht',
                currency: "€",
                placeholder: 0
              }),
              cartridge(ui, {
                content: "Taux TVA",
              }, {
                placeholder: 0,
                value: 20,
                currency: "%",
                name: 'tva',
              }),
              cartridge(ui, {
                content: "Montant TTC",
              }, {
                placeholder: 0,
                name: 'ttc',
                currency: "€",
              }),
            ]
          })
        ]
      }),
      messageBock(ui),
    ]
  });


  let buttons;
  if (workId && site) {
    buttons = actionButtons(ui, [
      { service: "create-bill", content: "Creer la facture", state: 1, sys_pn: "go-btn" },
    ])
  } else {
    buttons = actionButtons(ui, [
      { service: _a.create, content: "Creer la facture", state: 0, sys_pn: "go-btn" },
      { service: 'list-works', content: "Selectionner le travail" }
    ])
  }
  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Creer une facture" }),
      customerHeader(ui),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          buttons
        ]
      })
    ]
  });
};
