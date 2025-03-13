
module.exports = function (ui) {
  const fig = `${ui.fig.family}-topbar ${ui.fig.group}-topbar`;
  const name = Skeletons.Note({
    className: _a.name,
    content:  "Ajouter un client"
  });

  return Skeletons.Box.X({
    className: `${fig}__main`,
    debug: __filename,
    sys_pn: 'topbar',
    justify: _a.right,
    service: _e.raise,
    uiHandler: ui,
    kids: [
      Skeletons.Box.X({
        className: `${fig}__title`,
        service: _e.raise,
        uiHandler: ui,
        kids: [
          name
        ]
      }),
      Skeletons.Window.TopbarControl(ui, "c")
    ]
  });
};
;
