/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function workSkl(ui) {
  let { content, site, customer } = ui.data();
  console.log("AAA:14", ui.data())
  const uiHandler = ui.getHandlers(_a.ui);
  const kids = [
    // Skeletons.Box.Y({
    //   className: `${ui.fig.family}_reference-container`,
    //   debug: __filename,
    //   kids: [
    //     {
    //       ...customer,
    //       site,
    //       service: "load-customer-window",
    //       uiHandler,
    //       kind: "customer_item"
    //     },
    //     {
    //       ...site,
    //       customer,
    //       siteId: site.id,
    //       custId: customer.id,
    //       service: "load-site-window",
    //       uiHandler,
    //       kind: "site_item"
    //     }]
    // }),
    {
      ...content,
      site,
      customer,
      service: "load-mission-window",
      uiHandler,
      kind: "mission_item"
    },
  ]
  return kids;
}
module.exports = workSkl;