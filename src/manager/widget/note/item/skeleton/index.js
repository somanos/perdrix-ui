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
  let { siteId, workType, ctime, description, workId, docId, site } = ui.model.toJSON()
  let pfx = ui.fig.family;
  let desc = [
    Skeletons.Note({
      className: `${pfx}__text`,
      content: description
    }),
  ]
  if (docId) {
    desc.push(Skeletons.Note({
      className: `${pfx}__text`,
      content: `Photo ${docId}`
    }))
  }
  let overview = [
    Skeletons.Box.G({
      className: `${pfx}__summary header`,
      kids: [
        Skeletons.Note({
          className: `${pfx}__text`,
          content: fromUnixtime(ctime)
        }),
        // Skeletons.Note({
        //   className: `${pfx}__text type`,
        //   content: workType
        // }),
        // Skeletons.Note({
        //   className: `${pfx}__text`,
        //   content: `Numero de travail ${workId}`
        // }),
      ]
    }),
    //placeView(ui, site),
    // { ...site, state:0, siteId, type:'site', showMap:0, kind: 'location_view' },
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