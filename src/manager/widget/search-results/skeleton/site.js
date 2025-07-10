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
function siteSkl(ui) {
  const uiHandler = ui.getHandlers(_a.ui);
  let { content, site, customer } = ui.data();
  const kids = [
    // {
    //   ...customer,
    //   service: "load-customer-window",
    //   uiHandler,
    //   kind: "customer_item"
    // },
    {
      ...content,
      site,
      customer,
      siteId: site.id,
      custId: customer.id,
      service: "load-site-window",
      uiHandler,
      kind: "site_item"
    },
  ]
  return kids;
}
module.exports = siteSkl;