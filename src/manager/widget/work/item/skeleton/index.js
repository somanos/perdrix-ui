/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { fromUnixtime } = require("../../../../utils")
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
  if (!location) location = []
  if (location[1]) location[1] = location[1].ucFirst();
  let pfx = ui.fig.family;
  let place;
  if (ui.mget(_a.format) == _a.small) {
    place = null
  } else {
    place = Skeletons.Box.G({
      className: `${pfx}__details`,
      kids: [
        Skeletons.Note({
          className: `${pfx}__text`,
          content: location.join(' ') + ' ' + city
        })
      ]
    })
  }

  let overview = [
    Skeletons.Box.Y({
      className: `${pfx}__conten`,
      kids: [
        Skeletons.Box.G({
          className: `${pfx}__summary header`,
          kids: [
            Skeletons.Note({
              className: `${pfx}__text`,
              content: fromUnixtime(ctime)
            }),
            Skeletons.Note({
              className: `${pfx}__text type`,
              content: type || workType
            }),
            Skeletons.Note({
              className: `${pfx}__text`,
              content: id.toString()
            }),
          ]
        }),
        place,
      ]
    }),
    Skeletons.Note({
      className: `${pfx}__description`,
      content: description.replace(/\n/g, '<br>')
    }),
  ]

  return Skeletons.Box.G({
    className: `${pfx}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.G({
        className: `${pfx}__summary`,
        kids: overview,
      }),
    ]
  })

}
module.exports = work_item;