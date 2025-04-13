
const {
  list, customerHeader, siteSelector, actionButtons,
  headerBox, messageBock, descriptionEntry, cartridge
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
      Skeletons.Box.G({
        className: `${pfx}__description-container`,
        kids: [
          descriptionEntry(ui, {
            label: "Description",
            ico: "desktop_desksettings",
            name: "description",
            sys_pn: "description",
            value: ui.work.mget(_a.description)
          }),
          Skeletons.Box.Y({
            className: `${pfx}_quote-container`,
            kids: [
              cartridge(ui, {
                content: "Montant HT",
              }, {
                value: 0,
                name: 'ht',
              }),
              cartridge(ui, {
                content: "Taux TVA",
              }, {
                value: 0,
                name: 'tva',
              }),
              cartridge(ui, {
                content: "Remise",
              }, {
                value: 0,
                name: 'discount',
              }),
              cartridge(ui, {
                content: "Montant TTC",
              }, {
                value: 0,
                name: 'ht',
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
      headerBox(ui, { title: "Creer un devis" }),
      customerHeader(ui),
      Skeletons.Box.Y({
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          actionButtons(ui, [{ service: _a.create, content: LOCALE.CREATE }]),
        ]
      })
    ]
  });
};
