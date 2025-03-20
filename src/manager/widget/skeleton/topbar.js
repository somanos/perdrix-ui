
export function topbarBox(ui, opt) {
  let { title, mode } = opt;
  if (!mode) mode = "c";
  const fig = `${ui.fig.family}-topbar`;
  if (!title) title = ui.mget(_a.filename) || ui.mget(_a.name);
  const name = Skeletons.Note({
    className: _a.name,
    content: title
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
      Skeletons.Window.TopbarControl(ui, mode)
    ]
  });
};


export function headerBox(_ui_, opt) {
  const pfx = _ui_.fig.family;
  return Skeletons.Box.X({
    className: `${pfx}__header ${_ui_.fig.group}__header`,
    kids: [topbarBox(_ui_, opt)],
    sys_pn: _a.header
  });
};

