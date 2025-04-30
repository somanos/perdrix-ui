/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const {  devise, vat } =  require("../../../../utils")
const { labelValue } = require("../../../skeleton")


/**
 * 
 * @param {*} ui 
 * @returns 
 */

function quote(ui) {
  let {
    chrono, ht, ttc, tva, docId, discount
  } = ui.model.toJSON() || {};
  let pfx = `${ui.fig.family}__cartridge`
  let body = Skeletons.Box.Y({
    className: `${pfx}-body`,
    debug: __filename,
    kidsOpt: {
      className: `${pfx}-row`,
    },
    kids: [
      labelValue(ui, "Montant HT", devise(ht)),
      labelValue(ui, "TVA", vat(tva)),
      labelValue(ui, "Remise", devise(discount)),
      labelValue(ui, "Montant TTC", devise(ttc)),
      labelValue(ui, "Document", docId),
    ]
  });
  return Skeletons.Box.Y({
    className: `${pfx}-main`,
    kids:[
      // Skeletons.Box.X({
      //   className: `${pfx}-header`,
      //   kids: Skeletons.Note({
      //     className: `label`,
      //     content: `Devis n ${chrono}`
      //   })
      // }),
      body,    
    ]
  })
}
module.exports = quote;