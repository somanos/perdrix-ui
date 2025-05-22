/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { fromUnixtime } = require("../../../../utils")
const {
 contextButtons,descriptionEntry
} = require("../../../skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function note_item(ui) {
  let { hub_id, home_id, ctime, description, pid } = ui.model.toJSON()
  let pfx = ui.fig.family;
  let overview = [
    Skeletons.Box.G({
      className: `${pfx}__summary header`,
      kids: [
        Skeletons.Note({
          className: `${pfx}__text`,
          content: fromUnixtime(ctime)
        }),
        ...contextButtons(ui)
      ]
    }),
    Skeletons.Box.G({
      className: `${pfx}__description`,
      kids: [
        Skeletons.Entry({
          className: `${pfx}__entry`,
          type:_a.textarea,
          value: description,
          formItem: "description",
          name: "description",
        }),
      ],
    }),
    Skeletons.Box.Y({
      className: `${pfx}__attachment`,
      kids: [{
        kind: "attachment_handler",
        sys_pn: "attachment",
        partHandler: ui,
        hub_id,
        home_id,
        pid
      }]
    }),
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
module.exports = note_item;