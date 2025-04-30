
const {
  list, customerHeader, siteSelector, actionButtons,
  headerBox, messageBock, descriptionEntry, cartridge
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;
  let { site, description } = ui.model.toJSON()
  let siteView;
  if(site){
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
      Skeletons.FileSelector({
        partHandler: ui,
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
        kids:[
          siteView
        ]
      }),
      Skeletons.Box.G({
        className: `${pfx}__description-container`,
        kids: [
          descriptionEntry(ui, {
            label: "Description",
            ico: "desktop_desksettings",
            name: "description",
            sys_pn: "description",
            value: description
          }),
          Skeletons.Box.Y({
            className: `${pfx}__cartridge-container`,
            kids: [
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
                content: "Remise",
              }, {
                name: 'discount',
                placeholder: 0,
                currency: "€"
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
      messageBock(ui)
    ]
  });


  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Créer un devis" }),
      customerHeader(ui),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          actionButtons(ui, [
            { sys_pn:"btn-create", service: _a.create, content: "Créer le devis" }
          ]),
        ]
      })
    ]
  });
};
