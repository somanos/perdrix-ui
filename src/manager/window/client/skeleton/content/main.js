function clientMain(ui) {

  let tabs = require('./tabs')(ui)
  let list = Skeletons.List.Smart({
    className: `${ui.fig.group}__content-list`,
    innerClass: "drive-content-scroll",
    sys_pn: _a.list,
    vendorOpt: Preset.List.Orange_e,
  });

  return Skeletons.Box.Y({
    className  : `${ui.fig.family}__main ${ui.fig.group}__main`,
    radio      : _a.parent,
    debug      : __filename,
    kids       : [tabs, list]});

};

module.exports = clientMain;