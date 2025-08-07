const { entry, addressSearchBoxes } = require("../../../skeleton")

module.exports = function (ui) {
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
  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main`,
    kids: [
      Skeletons.Note({
        className: `${ui.fig.family}__ searchbox`,
        content: "Choisissez le client du chantier",
      }),
      addressSearchBoxes(ui, itemsOpt, extra)
    ]
  });

};;
