function dockMain(_ui_) {
  const pfx = _ui_.fig.family;
  return Skeletons.Box.X({
    className: `${pfx}__main`,
    sys_pn: "dock-container",
    debug: __filename,
    kids: [
      require('./launcher')(_ui_),
    ]
  });
};
module.exports = dockMain;
