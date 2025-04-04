
const {
  customerBox, radioButtons, headerBox, messageBock, footerWrapper
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;

  const selection = Skeletons.Wrapper.Y({
    className: `${ui.fig.family}__street-selection-container`,
    sys_pn: "street-selection"
  });

  const body = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      radioButtons(ui, {
        name: "category",
        service: "select-category",
        buttons: [
          { label: "Personne morale", state: 1, value: "company" },
          { label: "Personne physique", state: 0, value: "person" }
        ],
      }),
      selection,
      Skeletons.Box.Y({
        className: `${pfx}__entries-container`,
        sys_pn: "entries",
        kids: [
          customerBox(ui),
        ]
      }),
      messageBock(ui),
      Skeletons.Wrapper.Y({
        className: `${pfx}__entries-manual`,
        sys_pn: "entries-manual",
        state: 0,
      })
    ]
  });


  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title: "Creer un client" }),
      Skeletons.Box.Y({
        service: _e.raise,
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          body, 
          footerWrapper(ui), 
        ]
      })
    ]
  });

};
