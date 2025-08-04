
const { entry } = require("../../../widget/skeleton")

module.exports = function (ui) {
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__list`,
    radio: _a.parent,
    debug: __filename,
    kids: [
      Skeletons.Box.G({
        className: `${ui.fig.family}__search-container`,
        name: "tooltips",
        kids: [
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
        itemsOpt: {
          kind: 'site_item',
          flow: _a.x,
          service: 'load-site-window',
          role: ui.mget(_a.role) || '',
          logicalParent: ui,
          uiHandler: [ui],
          callbackService: "site-updated"
        },
        vendorOpt: Preset.List.Orange_e,
        api: ui.getCurrentApi,
      })
    ]
  })
};