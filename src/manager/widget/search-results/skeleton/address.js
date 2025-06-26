/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function addressSkl(ui) {
  const uiHandler = ui.getHandlers(_a.ui);
  let { content } = ui.data();
  const kids = [
    {
      ...content,
      service: "load-address-window",
      uiHandler,
      showMap:0,
      kind: "location_view"
    },
  ]
  return kids;
}
module.exports = addressSkl;