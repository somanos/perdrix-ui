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

function qote(ui) {
  let {
    chrono, ht, ttc, tva, status, folderId
  } = ui.mget('quote') || {};
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

  let quote;
  if(chrono){
    quote= [
      Skeletons.Box.X({
        className: `${pfx}-header`,
        kids: Skeletons.Note({
          className: `label`,
          content: `Devis n ${chrono}`
        })
      }),
      body,
    ]  
  }else{
    quote= [
      Skeletons.Box.X({
        className: `${pfx}-header`,
        kids: Skeletons.Note({
          className: `label`,
          content: `Pas de devis`
        })
      }),
    ]  
  }
  return quote;
}
module.exports = qote;