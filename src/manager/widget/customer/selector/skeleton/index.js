const { entry, headerBox, addressSearchBoxes, messageBock } = require("../../../skeleton")

module.exports = function (ui) {
  let pfx = `${ui.fig.family}`;

  const itemsOpt = {
    service: 'select-customer',
    kind: 'customer_item',
    uiHandler: [ui],
    radio: `selector-${ui._id}`,
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
  const title = ui.mget(_a.title) || 'Choisir un client pour le nouveau chantier';
  const purpose = ui.mget('purpose') || "create-customer";

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title }),
      Skeletons.Box.Y({
        service: _e.raise,
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body,
          messageBock(ui),
          Skeletons.Box.X({
            className: `${ui.fig.family}__buttons-main`,
            kids: [
              Skeletons.Note({
                className: `${pfx}__button-item`,
                content: "Choisir le client sélectionné",
                service: "create-from-selected",
                sys_pn: "create-from-selected",
                state: 0,
              }),
              Skeletons.Note({
                className: `${pfx}__button-item`,
                content: "Créer un nouveau client",
                service: purpose,
                state: 1,
              }),
            ]
          })
        ]
      })
    ]
  });

};;
