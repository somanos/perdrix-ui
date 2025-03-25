export function headerBox(_ui_) {
  const pfx = _ui_.fig.family;
  const header = Skeletons.Box.X({
    className: `${pfx}__header ${_ui_.fig.group}__header`,
    kids: [require('./topbar')(_ui_)],
    sys_pn: _a.header
  });
  return header;
};

