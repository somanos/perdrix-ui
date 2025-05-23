/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function customerview(ui) {
  let { content } = ui.data();
  let { gender, custName } = content; //ui.data();
  const uiHandler = ui.getHandlers(_a.ui);

  const kids = [
    {
      ...content,
      uiHandler,
      service: "load-customer-window",
      kind: "customer_item"
    }
  ]
  return kids;
}
module.exports = customerview;