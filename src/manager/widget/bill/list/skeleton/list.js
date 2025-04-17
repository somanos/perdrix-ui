
module.exports = function (ui) {
  return Skeletons.List.Smart({
    className: `${ui.fig.family}__list`,
    innerClass: "drive-content-scroll",
    sys_pn: _a.list,
    flow: _a.none,
    uiHandler: null,
    dataset: {
      role: _a.container,
    },
    itemsOpt: {
      kind: 'bill_item',
      flow: _a.x,
      service: ui.mget('itemService') || 'open-node',
      role: ui.mget(_a.role) || '',
      logicalParent: ui,
      uiHandler:[ui]
    },
    vendorOpt: Preset.List.Orange_e,
    api: ui.getCurrentApi,
  });

  return list;
};