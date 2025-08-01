
module.exports = function (ui) {
  return Skeletons.List.Smart({
    className: `${ui.fig.family}__content-results`,
    innerClass: "drive-content-scroll",
    sys_pn: _a.list,
    flow: _a.none,
    uiHandler: null,
    dataset: {
      role: _a.container,
    },
    itemsOpt: {
      kind: 'site_item',
      flow: _a.x,
      service: ui.mget('itemService'),
      role: ui.mget(_a.role) || '',
      logicalParent: ui,
      uiHandler: [ui],
      callbackService: "site-updated"
    },
    vendorOpt: Preset.List.Orange_e,
    api: ui.getCurrentApi,
  });

  return list;
};