/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { fromUnixtime, devise, vat } = require("../../../../utils")
const commaNumber = require('comma-number')

/**
 * 
 * @param {*} ui 
 * @returns 
 */

const STATUS = [
  '🔒', '🧰'
]
function bill_item(ui) {
  let { chrono, ctime, description, workId, ht, ttc } = ui.model.toJSON()
  let pfx = ui.fig.family;
  if (!workId) {
    return Skeletons.Note({
      className: `${pfx}__text`,
      content: "Numéro de mission manquant"
    })
  }
  let overview = [
    Skeletons.Box.G({
      className: `${pfx}__summary header`,
      kids: [
        Skeletons.Note({
          className: `${pfx}__text`,
          content: fromUnixtime(ctime)
        }),
        Skeletons.Note({
          className: `label`,
          content: `Facture n ${chrono}`
        }),
        Skeletons.Box.X({
          className: `${pfx}__summary billing`,
          kids: [
            Skeletons.Note({
              className: `amount`,
              content: devise(commaNumber(ht, ' ', '.')),
            }),
            Skeletons.Note({
              className: `amount`,
              content: devise(commaNumber(ttc, ' ', '.'))
            }),
          ]
        })
      ]
    }),
    Skeletons.Box.X({
      className: `${pfx}__description`,
      kids: [
        Skeletons.Note({
          className: `${pfx}__text`,
          content: description.replace(/\n/g, '<br>')
        }),
      ]
    }),
  ]
  // if (chrono) {
  //   overview.push(require('./bill')(ui))
  // }
  return Skeletons.Box.G({
    className: `${pfx}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.Y({
        className: `${pfx}__summary`,
        kids: overview,
      }),
    ]
  })

}
module.exports = bill_item;
