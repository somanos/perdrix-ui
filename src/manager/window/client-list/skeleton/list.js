
const __media_skl_row = function (ui) {

  const list = Skeletons.List.Smart({
    className: `${ui.fig.family}__content-results`,
    innerClass: "drive-content-scroll",
    sys_pn: _a.list,
    flow: _a.none,
    uiHandler: null,
    dataset: {
      role: _a.container,
    },
    itemsOpt: {
      kind: 'client_item',
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

module.exports = __media_skl_row;