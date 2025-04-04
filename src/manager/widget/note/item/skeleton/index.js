/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { fromUnixtime } = require("../../../../utils")
const {
  placeView
} = require("../../../skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function note_item(ui) {
  let { workType, ctime, description, workId, folderId, site } = ui.model.toJSON()
  let pfx = ui.fig.family;
  let desc = [
    Skeletons.Note({
      className: `${pfx}__text`,
      content: description
    }),
  ]
  if (folderId) {
    desc.push(Skeletons.Note({
      className: `${pfx}__text`,
      content: `Photo ${folderId}`
    }))
  }
  let overview = [
    Skeletons.Box.G({
      className: `${pfx}__summary header`,
      kids:  [
        Skeletons.Note({
          className: `${pfx}__text`,
          content: fromUnixtime(ctime)
        }),
        Skeletons.Note({
          className: `${pfx}__text type`,
          content: workType
        }),
        Skeletons.Note({
          className: `${pfx}__text`,
          content: `Numero de travail ${workId}`
        }),
      ]
    }),
    placeView(ui, site),
    Skeletons.Box.G({
      className: `${pfx}__description`,
      kids: desc
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
      // Skeletons.Box.Y({
      //   className: `${pfx}__quote`,
      //   kids: require("./media")(ui),
      // }),
    ]
  })

}
module.exports = note_item;