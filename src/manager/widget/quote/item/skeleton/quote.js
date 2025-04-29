/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { fromUnixtime, devise, vat } =  require("../../../../utils")

/**
 * 
 */
function row(ui, label, value) {
  return Skeletons.Box.G({
    kids: [
      Skeletons.Note({
        className: `label`,
        content: label,
      }),
      Skeletons.Note({
        className: `value`,
        content: value,
      }),
    ]
  })
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function quote(ui) {
  let {
    chrono, ht, ttc, tva, folderId
  } = ui.model.toJSON() || {};
  let pfx = `${ui.fig.family}__quote`
  let body = Skeletons.Box.Y({
    className: `${pfx}-body`,
    debug: __filename,
    kidsOpt: {
      className: `${pfx}-row`,
    },
    kids: [
      row(ui, "Montant HT", devise(ht)),
      row(ui, "TVA", vat(tva)),
      row(ui, "Montant TTC", devise(ttc)),
      row(ui, "Document", folderId),
    ]
  });
  return Skeletons.Box.Y({
    className: `${pfx}-main`,
    kids:[
      Skeletons.Box.X({
        className: `${pfx}-header`,
        kids: Skeletons.Note({
          className: `label`,
          content: `Devis n ${chrono}`
        })
      }),
      body,    
    ]
  })
}
module.exports = quote;