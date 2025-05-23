/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { normalizelLocation } = require("../../../utils")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
const LABELS = [
  "Tel. bureau",
  "Tel. domicile",
  "Tel. portable",
  "Fax"
]
function contactchantierview(ui) {
  let { content } = ui.data();
  const uiHandler = ui.getHandlers(_a.ui);
  const kids = [
    {
      ...content,
      uiHandler,
      service: "load-poc-form",
      kind: "poc_item"
    },
  ]
  return kids;
}
module.exports = contactchantierview;