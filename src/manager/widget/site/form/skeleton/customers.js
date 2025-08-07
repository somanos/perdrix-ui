const { entry, headerBox, addressSearchBoxes } = require("../../../skeleton")

module.exports = function (ui) {
  let pfx = `${ui.fig.family}-customer`;

  const itemsOpt = {
    service: 'select-customer',
    kind: 'customer_item',
    uiHandler: [ui],
  };
  let extra = entry(ui, {
    className: `${ui.fig.family}__searchbox customer`,
    placeholder: "Nom client",
    name: 'custName',
    sys_pn: "cust-entry"
  });
  const body = Skeletons.Box.Y({
    className: `${pfx}__searchbox-main`,
    kids: [
      addressSearchBoxes(ui, itemsOpt, extra)
    ]
  });
  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main`,
    kids: [
      headerBox(ui, { title: "Creer un chantier" }),
      Skeletons.Box.Y({
        className: `${pfx}__container `,
        kids: [
          Skeletons.Note({
            className: `${pfx}__customer-searchbox-text`,
            content: "Choisissez le client du chantier",
          }),
          body,
        ]
      })
    ]
  });

};;
