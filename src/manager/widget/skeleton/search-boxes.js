
const { entry } = require("./widgets")

export function addressSearchBoxes(ui, itemsOpt, extra = null) {
  let dataset = { col: 4 };
  let fig = ui.fig.family;
  let boxes = [
    entry(ui, {
      className: `${fig}__searchbox street`,
      placeholder: "Nom de la voie",
      name: 'street',
      sys_pn: "street-entry",
      service: _a.search,
    }),
    entry(ui, {
      className: `${fig}__searchbox city`,
      placeholder: "Nom de la ville",
      name: _a.city,
      sys_pn: "city-entry",
      service: _a.search,
    }),
    entry(ui, {
      className: `${fig}__searchbox postcode`,
      placeholder: "Code postal",
      name: 'postcode',
      sys_pn: "postcode-entry",
      service: _a.search,
    }),
    Skeletons.Button.Svg({
      className: `${fig}__searchbox icon`,
      ico: "unavailable",
      service: _e.reset
    }),
  ]
  if (extra) {
    dataset = { col: 5 }
    boxes.unshift(extra)
  }
  return Skeletons.Box.Y({
    className: `${fig}__list-container`,
    radio: _a.parent,
    debug: __filename,
    sys_pn: "search-box",
    kids: [
      Skeletons.Box.G({
        className: `${fig}__search-container`,
        name: "tooltips",
        dataset,
        kids: boxes
      }),
      Skeletons.List.Smart({
        className: `${fig}__content-results`,
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