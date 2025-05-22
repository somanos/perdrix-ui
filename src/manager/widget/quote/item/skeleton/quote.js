/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { devise, vat } = require("../../../../utils")
const { labelValue, entryValue, quoteForm } = require("../../../skeleton")


/**
 * 
 * @param {*} ui 
 * @returns 
 */

function oldquote(ui) {
  // let {
  //   ht, ttc, tva, discount, filepath
  // } = ui.model.toJSON() || {};

  // let input = [
  //   entryValue(ui, "Montant HT", devise(ht)),
  //   entryValue(ui, "TVA", vat(tva)),
  //   entryValue(ui, "Remise", devise(discount)),
  //   entryValue(ui, "Montant TTC", devise(ttc)),
  //   labelValue(ui, "Document", filepath, "show-doc"),
  // ]

  // if (Visitor.canWrite()) {
  //   input = [
  //     entryValue(ui, "Montant HT", devise(ht)),
  //     entryValue(ui, "TVA", vat(tva)),
  //     entryValue(ui, "Remise", devise(discount)),
  //     entryValue(ui, "Montant TTC", devise(ttc)),
  //     labelValue(ui, "Document", filepath, "show-doc"),
  //   ]
  // } else {
  //   input = [
  //     labelValue(ui, "Montant HT", devise(ht)),
  //     labelValue(ui, "TVA", vat(tva)),
  //     labelValue(ui, "Remise", devise(discount)),
  //     labelValue(ui, "Montant TTC", devise(ttc)),
  //     labelValue(ui, "Document", filepath),
  //   ]
  // }

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
        kids: quoteForm(ui),
      }),
    ]
  })
}
function quote(ui) {
  let {
    ht, ttc, tva, discount
  } = ui.model.toJSON() || {};
  const pfx = `${ui.fig.family}`
  return Skeletons.Box.Y({
    className: `${pfx}-main`,
    kids: [
      Skeletons.Box.Y({
        className: `${pfx}-body`,
        debug: __filename,
        kids: [{
          kind: "quote_cartridge",
          ht,
          ttc,
          tva,
          discount
        }]
      })
    ]
  })
}

module.exports = quote;