
const { addressSearchBoxes } = require("../../../widget/skeleton")

module.exports = function (ui) {
  let itemsOpt = {
    kind: 'location_view',
    flow: _a.x,
    service: "load-viewer",
    role: ui.mget(_a.role) || '',
    logicalParent: ui,
    showMap: 0,
    uiHandler: [ui],
  }
  return addressSearchBoxes(ui, itemsOpt)
};