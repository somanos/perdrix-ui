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

const STATUS = [
  '🔧', '🔨', '🪒', '🔒', '🧰'
]
function work_item(ui) {
  let { type, workType, ctime, description, status, site, id } = ui.model.toJSON()
  let { city, location } = site;
  if (!location) location = []
  let pfx = ui.fig.family;
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
          content: id.toString()
        }),
        Skeletons.Note({
          className: `${pfx}__text type`,
          content: workType || type
        }),
        Skeletons.Note({
          className: `${pfx}__text status`,
          content: STATUS[status]
        })
      ]
    }),
    Skeletons.Box.Y({
      className: `${pfx}__details`,
      kids: [
        Skeletons.Note({
          className: `${pfx}__text`,
          content: description.replace(/\n/g, '<br>')
        }),
        Skeletons.Note({
          className: `${pfx}__text`,
          content: location.join(' ') + ' ' + city
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
      Skeletons.Box.Y({
        className: `${pfx}__quote`,
        kids: require("./quote")(ui),
      }),
    ]
  })

}
module.exports = work_item;