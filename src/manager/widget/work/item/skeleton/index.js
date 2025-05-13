/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { fromUnixtime, normalizelLocation } = require("../../../../utils")
/**
 * 
 * @param {*} ui 
 * @returns 
 */

function work_item(ui) {
  let { type, workType, ctime, description, site, id } = ui.model.toJSON()
  let { city, location } = site;
  if (!id) {
    return Skeletons.Note({
      className: `${pfx}__description`,
      content: "Travail indéterminé"
    })
  }
  let pfx = ui.fig.family;
  let { bill, quote, note } = ui.model.toJSON();
  let line1 = Skeletons.Box.G({
    className: `${pfx}__summary header`,
    kids: [
      Skeletons.Note({
        className: `${pfx}__text`,
        content: fromUnixtime(ctime)
      }),
      Skeletons.Box.X({
        className: `${pfx}__summary-count`,
        kidsOpt: {
          className: `${pfx}__summary-count-item`,
        },
        kids: [
          Skeletons.Button.Label({
            ico: 'editbox_pencil',
            label: `${note} notes`,
          }),
          Skeletons.Button.Label({
            ico: 'account_documents',
            label: `${quote} devis`,
          }),
          Skeletons.Button.Label({
            ico: 'desktop_drumeememo',
            label: `${bill} factures`,
          }),
        ]
      }),
    ]
  })
  let overview = [
    line1,
    Skeletons.Box.G({
      className: `${pfx}__summary content`,
      kids: [
        Skeletons.Note({
          className: `${pfx}__text type`,
          content: type || workType
        }),
        Skeletons.Note({
          className: `${pfx}__description`,
          content: description.replace(/\n/g, '<br>')
        })
      ]
    })
  ]

  if (ui.mget(_a.format) == _a.extra) {
    const adresse = normalizelLocation(location)
    overview.push(
      Skeletons.Box.G({
        className: `${pfx}__summary extra`,
        kids: [
          Skeletons.Note({
            className: `${pfx}__text`,
            content: city
          }),
          Skeletons.Note({
            className: `${pfx}__text`,
            content: adresse
          })
        ]
      }))
  }

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
module.exports = work_item;