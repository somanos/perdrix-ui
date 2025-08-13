
const {
  address, headerBox, actionButtons
} = require("../../../skeleton")

module.exports = function (ui) {
  const pfx = ui.fig.family;


  const content = Skeletons.Box.Y({
    className: `${pfx}__body`,
    sys_pn: _a.content,
    kids: [
      address(ui, ui.data()),
      actionButtons(ui, [
        { sys_pn: "btn-create", service: _e.update, content: LOCALE.UPDATE }
      ])
    ]
  });

  const dialog = Skeletons.Wrapper.Y({
    className: `${ui.fig.group}__wrapper--modal dialog__wrapper--modal ${ui.fig.family}`,
    name: "dialog"
  });


  let title = "Mettre à jour l'adresse";

  return Skeletons.Box.Y({
    debug: __filename,
    className: `${pfx}__main ${ui.fig.group}__main`,
    kids: [
      headerBox(ui, { title }),
      Skeletons.Box.Y({
        service: _e.raise,
        className: `${pfx}__container ${ui.fig.group}__container`,
        kids: [
          content,
        ]
      }),
      dialog
    ]
  });

};
