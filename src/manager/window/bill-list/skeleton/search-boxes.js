
const { entry } = require("../../../widget/skeleton")
export function addressSearchBoxes(ui, itemsOpt) {
  let dataset = { col: 5 };
  let fig = ui.fig.family;
  let boxes = [
    entry(ui, {
      className: `${fig}__searchbox city`,
      placeholder: "Description de devis",
      name: _a.year,
      sys_pn: "year-entry",
      service: _a.search,
    }),
    entry(ui, {
      className: `${fig}__searchbox street`,
      placeholder: "N° de devis",
      name: 'description',
      sys_pn: "description-entry",
      service: _a.search,
    }),
    entry(ui, {
      className: `${fig}__searchbox poc`,
      placeholder: "Nom du client",
      name: 'custName',
      sys_pn: "custname-entry",
      service: _a.search,
      mode: "editable"
    }),
    entry(ui, {
      className: `${fig}__searchbox city`,
      placeholder: "Addresse",
      name: "address",
      sys_pn: "address-entry",
      service: _a.search,
    }),
    Skeletons.Button.Svg({
      className: `${fig}__searchbox icon`,
      ico: "unavailable",
      service: _e.reset
    }),
  ]
  
  return Skeletons.Box.Y({
    className: `${fig}__list-container`,
    radio: _a.parent,
    debug: __filename,
    sys_pn: "search-box",
    kids: [
      Skeletons.Box.G({
        className: `${fig}__search-container quote`,
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