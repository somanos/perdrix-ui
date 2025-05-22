/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { cartridge, labelValue} = require("../../../skeleton")
/**
 * 
 * @param {*} ui 
 * @returns 
 */

function bill_cartridge(ui) {
  let pfx = ui.fig.family;
  let {
    ht, ttc, tva, discount, filepath
  } = ui.model.toJSON() || {};
  let input = [
    cartridge(ui, {
      content: "Montant HT",
    }, {
      name: 'ht',
      value: ht || 0,
      currency: "€",
      placeholder: 0
    }),
    cartridge(ui, {
      content: "Taux TVA",
    }, {
      placeholder: 0,
      value: tva || 20,
      currency: "%",
      name: 'tva',
    }),
    cartridge(ui, {
      content: "Remise",
    }, {
      name: 'discount',
      placeholder: 0,
      currency: "€",
      value: discount || 0
    }),
    cartridge(ui, {
      content: "Montant TTC",
    }, {
      placeholder: 0,
      name: 'ttc',
      currency: "€",
      value: ttc || 0
    }),
  ]
  if (filepath) {
    input.push(
      labelValue(ui, "Document", { content: filepath, service: "show-doc" })
    )
  }
  return Skeletons.Box.G({
    className: `${pfx}__main`,
    debug: __filename,
    kids: input
  })
}

module.exports = bill_cartridge;