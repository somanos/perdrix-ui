
const { entry, addressSearchBoxes } = require("../../../widget/skeleton")

module.exports = function (ui) {
  let itemsOpt = {
    kind: 'poc_item',
    flow: _a.x,
    service: 'load-site-window',
    role: ui.mget(_a.role) || '',
    logicalParent: ui,
    uiHandler: [ui],
    callbackService: "poc-updated"
  };
  let extra = entry(ui, {
    className: `${ui.fig.family}__searchbox poc`,
    placeholder: "Nom client",
    name: 'custName',
    sys_pn: "poc-entry",
     mode: "editable"
  });
  return addressSearchBoxes(ui, itemsOpt, extra)
};