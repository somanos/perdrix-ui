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

function contactchantierview(ui) {
  let { content, category, customer, site } = ui.data();
  const uiHandler = ui.getHandlers(_a.ui);
  let ref;
  if (category == 'customer') {
    ref = {
      ...customer,
      service: "load-customer-window",
      uiHandler,
      kind: "customer_item"
    }
  } else {
    ref = {
      ...site,
      customer,
      siteId: site.id,
      custId: customer.id,
      service: "load-site-window",
      uiHandler,
      kind: "site_item"
    }
  }
  const kids = [
    ref,
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