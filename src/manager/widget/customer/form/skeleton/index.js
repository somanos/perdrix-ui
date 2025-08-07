
const {
  customerBox, radioButtons, headerBox, messageBock, locationSearch, actionButtons
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;


  let isCompany = ui.mget(_a.type) == "company" ? 1 : 0;
  let isUpdate = ui.mget('isUpdate');

  let selection;
  if (isUpdate) {
    selection = Skeletons.Wrapper.Y({
      className: `${ui.fig.family}__street-selection-container`,
      sys_pn: "street-selection"
    });
  }
  let entryOpt = {
    placeholder: "Adresse",
    name: _a.location,
    sys_pn: "address-entry"
  }
  const customer = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      radioButtons(ui, {
        name: "category",
        service: "select-category",
        buttons: [
          { label: "Personne morale", state: isCompany, value: "company" },
          { label: "Personne physique", state: isCompany ^ 1, value: "person" }
        ],
      }),
      selection,
      Skeletons.Box.Y({
        className: `${pfx}__entries-container`,
        sys_pn: "entries",
        kids: [
          customerBox(ui),
          locationSearch(ui, entryOpt),
        ]
      }),
      messageBock(ui),
      Skeletons.Wrapper.Y({
        className: `${pfx}__entries-manual`,
        sys_pn: "entries-manual",
        state: isUpdate,
      }),
    ]
  });

  if (!isUpdate) {
    customer.kids.push(actionButtons(ui, [
      { sys_pn: "btn-create", service: _a.create, content: "Créer", state: 0 }
    ]),
    )
  }
  
  let title = "Créer un client";
  if (isUpdate) {
    title = "Mettre à jour un client"
  }
  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title }),
      Skeletons.Box.Y({
        service: _e.raise,
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          customer,
          Skeletons.Wrapper.Y({
            className: `${pfx}__body`,
            sys_pn: "poc-container"
          }),
          //require('./poc')(ui),
        ]
      })
    ]
  });

};
