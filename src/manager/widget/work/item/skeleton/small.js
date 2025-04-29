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

function work_item_small(ui) {
  let { type, workType, ctime, description, site, id } = ui.model.toJSON()
  let { city, location } = site;
  if (!location) location = []
  let pfx = ui.fig.family;
  let overview = [
    Skeletons.Box.Y({
      className: `${pfx}__conten-small`,
      kids: [
        Skeletons.Box.G({
          className: `${pfx}__summary header small`,
          kids: [
            Skeletons.Note({
              className: `${pfx}__text`,
              content: fromUnixtime(ctime)
            }),
            Skeletons.Note({
              className: `${pfx}__text`,
              content: id.toString()
            }),
            Skeletons.Note({
              className: `${pfx}__text type`,
              content: type || workType
            })
          ]
        }),
        Skeletons.Box.G({
          className: `${pfx}__details small`,
          kids: [
            Skeletons.Note({
              className: `${pfx}__text`,
              content: location.join(' ') + ' ' + city
            })
          ]
        })
      ]
    }),
    Skeletons.Note({
      className: `${pfx}__description`,
      content: description.replace(/\n/g, '<br>')
    }),

  ]

  return Skeletons.Box.G({
    className: `${pfx}__main small`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.G({
        className: `${pfx}__summary small`,
        kids: overview,
      }),
    ]
  })

}
module.exports = work_item_small;