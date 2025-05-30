const { entry } = require("../../../widget/skeleton")

module.exports = function (ui) {

  return Skeletons.Box.Y({
    className: `${ui.fig.family}__customers main`,
    radio: _a.parent,
    debug: __filename,
    kids: [
      entry(ui, {
        className: `${ui.fig.family}__customers searchbox`,
        placeholder: "Entrez le nom du nouveau client ou sélectionnez à partir de la list",
        name: _a.location,
        sys_pn: "address-entry"
      }),
      Skeletons.List.Smart({
        className: `${ui.fig.family}__customers content`,
        sys_pn: 'customers-list',
        partHandler: [ui],
        itemsOpt: {
          service: 'transfer-to-customer',
          kind: 'customer_item',
          uiHandler: [ui],
        },
        api: {
          service: PLUGINS.customer.list
        },
        vendorOpt: Preset.List.Orange_e,
      })
    ]
  });

};;
