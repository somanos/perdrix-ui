/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { fromUnixtime } = require("../../../utils")

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
    opt.itemsOpt = { kind }
  }
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__history-container`,
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
          Skeletons.Note({
            className: `${pfx}__text type`,
            content: type || workType
          })
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
                    service: "create-note"
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
                    service: "create-quote"
                  }),
                  Skeletons.Button.Label({
                    className: `${ui.fig.family}__button-action add`,
                    label: "Nouvelle facture",
                    ico: "editbox_list-plus",
                    icons: null,
                    service: "create-bill"
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
          // history(ui, {
          //   partName: "sales",
          // }),
          // Skeletons.Box.Y({
          //   className: `${pfx}__history-column`,
          //   kids: [
          //     history(ui, {
          //       partName: "quotes",
          //       kind: "quote_item",
          //       api: "work.quotations",
          //       label: "Nouveau devis",
          //       service: "create-quote"
          //     }),
          //     history(ui, {
          //       partName: "bills",
          //       kind: "bill_item",
          //       api: "work.bills",
          //       label: "Nouvelle facture",
          //       service: "create-bill"
          //     }),
          //   ]
          // })
        ]
      })
    ]
  })
}
module.exports = work_summary;