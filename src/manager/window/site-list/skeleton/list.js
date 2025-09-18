
const { entry, addressSearchBoxes } = require("../../../widget/skeleton")

module.exports = function (ui) {
  let itemsOpt = {
    kind: 'site_item',
    flow: _a.x,
    service: 'load-site-window',
    role: ui.mget(_a.role) || '',
    logicalParent: ui,
    uiHandler: [ui],
    callbackService: "site-updated"
  };
  let extra = entry(ui, {
    className: `${ui.fig.family}__searchbox customer`,
    placeholder: "Nom client",
    name: 'custName',
    service: _e.search,
    sys_pn: "cust-entry"
  });
  return addressSearchBoxes(ui, itemsOpt, extra)
};