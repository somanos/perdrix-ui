
const { entry } = require("./widgets")

export function addressSearchBoxes(ui, itemsOpt, extra = null) {
  let dataset;
  let boxes = [
    entry(ui, {
      className: `${ui.fig.family}__searchbox street`,
      placeholder: "Nom de la voie",
      name: 'street',
      sys_pn: "street-entry"
    }),
    entry(ui, {
      className: `${ui.fig.family}__searchbox city`,
      placeholder: "Nom de la ville",
      name: _a.city,
      sys_pn: "city-entry"
    }),
    entry(ui, {
      className: `${ui.fig.family}__searchbox postcode`,
      placeholder: "Code postal",
      name: 'postcode',
      sys_pn: "postcode-entry"
    }),
  ]
  if (extra) {
    dataset = { col: 4 }
    boxes.unshift(extra)
  }
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__list-container`,
    radio: _a.parent,
    debug: __filename,
    sys_pn: "search-box",
    kids: [
      Skeletons.Box.G({
        className: `${ui.fig.family}__search-container`,
        name: "tooltips",
        dataset,
        kidsOpt: {
          service: _a.search,
        },
        kids: boxes
      }),
      Skeletons.List.Smart({
        className: `${ui.fig.family}__content-results`,
        innerClass: "drive-content-scroll",
        sys_pn: _a.list,
        flow: _a.none,
        uiHandler: null,
        dataset: {
          role: _a.container,
        },
        itemsOpt,
        vendorOpt: Preset.List.Orange_e,
        api: ui.getCurrentApi,
      })
    ]
  })
};