/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { addressView } = require("../../../skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function location_item(ui) {
  let site = ui.mget('properties') || {};

  return Skeletons.Box.X({
    className: `${ui.fig.family}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__container`,
        kids:addressView(ui, site),
      })
    ]
  })

}
module.exports = location_item;