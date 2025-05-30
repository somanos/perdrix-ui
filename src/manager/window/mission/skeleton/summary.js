/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { fromUnixtime } = require("../../../utils")
const {
  menuInput
} = require("../../../widget/skeleton");


function history(ui, { partName, kind, api }) {
  let opt = {
    className: `${ui.fig.family}__history-content`,
    sys_pn: partName,
    flow: _a.y,
    spinnerWait: 1000,
    spinner: true,
    partHandler: [ui],
    vendorOpt: Preset.List.Orange_e,
    itemsOpt: {
      kind,
    }
  }
  if (api) {
    opt.api = { service: api, workId: ui.mget('workId') }
  }
  if (kind) {
    opt.itemsOpt = { kind, uiHandler: [ui] }
  }
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__history-content`,
    kids: [
      Skeletons.List.Smart(opt)
    ]
  })
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function work_summary(ui, data) {
  let { type, ctime, description = "", id } = data;
  let pfx = ui.fig.family;

  return Skeletons.Box.Y({
    className: `${pfx}__summary main`,
    kids: [
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
          menuInput(ui, {
            items: Env.get('workType'),
            name: 'category',
            placeholder: 'Type de travail',
            refAttribute: 'label',
            service: 'set-mission-type',
            value: type,
            api: {
              service: 'work.update',
              id: ui.mget(_a.id)
            }
          }),
        ]
      }),
      Skeletons.Note({
        className: `${pfx}__description`,
        content: description.replace(/\n/g, '<br>')
      }),
      Skeletons.Box.G({
        className: `${pfx}__history-main`,
        kids: [
          Skeletons.Box.Y({
            className: `${ui.fig.family}__history-container`,
            kids: [
              Skeletons.Box.X({
                className: `${ui.fig.family}__buttons`,
                kids: [
                  Skeletons.Button.Label({
                    className: `${ui.fig.family}__button-action add`,
                    label: "Nouvelle note",
                    ico: "editbox_list-plus",
                    icons: null,
                    uiHandler: ui,
                    service: "add-note"
                  })]
              }),
              history(ui, {
                partName: "notes",
                kind: "note_item",
                api: "work.notes",
              }),
            ]
          }),

          Skeletons.Box.Y({
            className: `${ui.fig.family}__history-container`,
            kids: [
              Skeletons.Box.X({
                className: `${ui.fig.family}__buttons`,
                kids: [
                  Skeletons.Button.Label({
                    className: `${ui.fig.family}__button-action add`,
                    label: "Nouveau devis",
                    ico: "editbox_list-plus",
                    icons: null,
                    service: "add-quote",
                    uiHandler: ui,
                  }),
                  Skeletons.Button.Label({
                    className: `${ui.fig.family}__button-action add`,
                    label: "Nouvelle facture",
                    ico: "editbox_list-plus",
                    icons: null,
                    service: "add-bill",
                    uiHandler: ui,
                  }),

                ]
              }),
              Skeletons.Box.Y({
                className: `${ui.fig.family}__history-content`,
                partHandler: [ui],
                sys_pn: "sales",
              })
            ]
          })
        ]
      })
    ]
  })
}
module.exports = work_summary;