/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */


module.exports = function (ui) {
  let opt = {
    className: `${ui.fig.family}__main`,
    innerClass: "drive-content-scroll",
    sys_pn: "main",
    flow: _a.x,
    uiHandler: null,
    spinnerWait: 1000,
    spinner: true,
    partHandler: ui,
    vendorOpt: Preset.List.Orange_e,
  }
  if (ui.mget(_a.pid)) {
    opt.api = {
      service: SERVICE.media.show_node_by,
      hub_id: ui.mget(_a.hub_id),
      nid: ui.mget(_a.pid)
    }
    opt.itemsOpt = { kind: "media_grid" }
  }
  return Skeletons.List.Smart(opt);
  // return Skeletons.Wrapper.X({
  //   className: `${pfx}__main`,
  //   sys_pn: "main",
  //   itemsOpt:{
  //     kind
  //   },
  //   partHandler: ui,
  //   state: 0,
  // })
};