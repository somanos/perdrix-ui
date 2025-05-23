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
  const uiHandler = ui.getHandlers(_a.ui);
  const kids = [
    {
      ...site,
      customer,
      service: "load-site-window",
      uiHandler,
      kind: "site_item"
    },
    {
      ...content,
      site,
      customer,
      service: "load-mission-window",
      uiHandler,
      kind: "work_item"
    },
  ]
  return kids;
}
module.exports = workSkl;