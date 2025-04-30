/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { devise, vat } = require("../../../../utils")
const { labelValue } = require("../../../skeleton")


/**
 * 
 * @param {*} ui 
 * @returns 
 */

function bill(ui) {
  let {
    ht, ttc, tva, filepath
  } = ui.model.toJSON() || {};
  let pfx = `${ui.fig.family}__cartridge`
  return Skeletons.Box.Y({
    className: `${pfx}-main`,
    kids: [
      Skeletons.Box.Y({
        className: `${pfx}-body`,
        debug: __filename,
        kidsOpt: {
          className: `${pfx}-row`,
        },
        kids: [
          labelValue(ui, "Montant HT", devise(ht)),
          labelValue(ui, "TVA", vat(tva)),
          labelValue(ui, "Montant TTC", devise(ttc)),
          labelValue(ui, "Document", filepath,"show-doc"),
        ]
      })
    ]
  })
}


module.exports = bill;