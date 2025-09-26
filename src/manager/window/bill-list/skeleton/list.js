
const { addressSearchBoxes } = require("./search-boxes")
module.exports = function (ui) {
  let itemsOpt = {
    kind: 'poc_item',
    flow: _a.x,
    service: 'load-site-window',
    role: ui.mget(_a.role) || '',
    logicalParent: ui,
    uiHandler: [ui],
    callbackService: "quote-updated"
  };
  return addressSearchBoxes(ui, itemsOpt)
};