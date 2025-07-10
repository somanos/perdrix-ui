/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function quoteSlk(ui) {
  let { content, customer, site } = ui.data();
  const uiHandler = ui.getHandlers(_a.ui);
  const kids = [
    Skeletons.Box.Y({
      className: `${ui.fig.family}_reference-container`,
      debug: __filename,
      kids: [
        // {
        //   ...customer,
        //   uiHandler,
        //   service: "load-customer-window",
        //   kind: "customer_item"
        // },
        {
          ...site,
          uiHandler,
          customer,
          service: "load-site-window",
          kind: "site_item"
        }]
    }),
    {
      ...content,
      uiHandler,
      customer,
      quoteId: content.id,
      siteId: site.id,
      custId: customer.id,
      site,
      service: "load-mission-window",
      kind: "quote_item"
    }
  ]
  return kids;
}
module.exports = quoteSlk;