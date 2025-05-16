function dockMain(ui) {
  const pfx = ui.fig.family;
  return Skeletons.Box.Y({
    className: `${pfx}__main`,
    kids: [
      Skeletons.Wrapper.X({
        className: `${ui.fig.family}__message-container`,
        sys_pn:'message'
      }),
      Skeletons.Box.X({
        className: `${pfx}__launcher-bar`,
        sys_pn: "dock-container",
        debug: __filename,
        kids: [
          require('./launcher')(ui),
        ]
      })]

  })
};
module.exports = dockMain;
