
const { addressSearchBoxes } = require("./search-boxes")

module.exports = function (ui) {
  let itemsOpt = {
    kind: 'quote_item',
    flow: _a.x,
    role: ui.mget(_a.role) || '',
    logicalParent: ui,
    uiHandler: [ui],
    callbackService: "quote-updated"
  };
  return addressSearchBoxes(ui, itemsOpt)
};