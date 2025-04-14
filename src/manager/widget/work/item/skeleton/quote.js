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
      row(ui, "Document", filepath),
    ]
  });

  let quote;
  if (chrono) {
    let view_quote = Skeletons.Note({
      className: `label`,
      content: `Devis n ${chrono}`,
    });
    if (filepath) {
      view_quote.className = `label clickable`;
      view_quote.service = 'view-quote';
      view_quote.uiHandler = [ui];
    }
    quote = [
      Skeletons.Box.X({
        className: `${pfx}-header`,
        kids: [view_quote]
      }),
      body,
    ]
  } else {
    quote = [
      Skeletons.Box.X({
        className: `${pfx}-header`,
        kids: actionButtons(ui, [
          { content: "Creer un devis", service: "create-quote" }
        ])
      }),
    ]
  }
  return quote;
}
module.exports = qote;