
const { entry, addressSearchBoxes } = require("../../../widget/skeleton")

module.exports = function (ui) {
  let itemsOpt = {
    kind: 'customer_item',
    flow: _a.x,
    service: ui.mget('itemService'),
    role: ui.mget(_a.role) || '',
    logicalParent: ui,
    uiHandler: [ui],
    callbackService: "customer-updated"
  }
  let extra = entry(ui, {
    className: `${ui.fig.family}__searchbox customer`,
    placeholder: "Nom client",
    name: 'custName',
    sys_pn: "cust-entry"
  });
  return addressSearchBoxes(ui, itemsOpt, extra)
};