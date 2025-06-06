/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { vat } = require("../../../../utils")


/**
 * 
 * @param {*} ui 
 * @returns 
 */

function bill(ui) {
  let {
    ht, ttc, tva
  } = ui.model.toJSON() || {};
  const pfx = `${ui.fig.family}`
  return Skeletons.Box.Y({
    className: `${pfx}-main`,
    kids: [
      Skeletons.Box.Y({
        className: `${pfx}-body`,
        debug: __filename,
        kids: [{
          kind: "bill_cartridge",
          ht,
          ttc,
          tva: vat(tva),
        }]
      })
    ]
  })
}


module.exports = bill;