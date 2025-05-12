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
  const adresse = normalizelLocation(location)
  let pfx = ui.fig.family;
  let place;
  if (ui.mget(_a.format) == _a.small) {
    place = null
  } else {
    place = Skeletons.Box.X({
      className: `${pfx}__details`,
      kids: [
        Skeletons.Note({
          className: `${pfx}__text`,
          content: adresse
        })
      ]
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
          className: `${pfx}__text`,
          content: city
        }),
        place,
      ]
    }),
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