/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { devise, vat } = require("../../../../utils")
const {
  actionButtons
} = require("../../../skeleton")

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
    chrono, ht, ttc, tva, filepath
  } = ui.mget('bill') || {};
  let pfx = `${ui.fig.family}__bill`
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
      row(ui, "Document", filepath),
    ]
  });

  let bill;
  if (chrono) {
    let view_bill = Skeletons.Note({
      className: `label`,
      content: `Facture n ${chrono}`,
    });
    if (filepath) {
      view_bill.className = `label clickable`;
      view_bill.service = 'view-bill';
      view_bill.uiHandler = [ui];
    }
    bill = [
      Skeletons.Box.X({
        className: `${pfx}-header`,
        kids: [view_bill]
      }),
      body,
    ]
  } else {
    bill = [
      Skeletons.Box.X({
        className: `${pfx}-header`,
        kids: actionButtons(ui, [
          { content: "Editer une facture", service: "add-bill" }
        ])
      }),
    ]
  }
  return bill;
}
module.exports = qote;