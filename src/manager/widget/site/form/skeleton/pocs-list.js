const { entry } = require("../../../../widget/skeleton")

module.exports = function (ui) {

  return Skeletons.Box.Y({
    className: `${ui.fig.family}__pocs main`,
    radio: _a.parent,
    debug: __filename,
    kids: [
      entry(ui, {
        className: `${ui.fig.family}__pocs searchbox`,
        placeholder: "Entrez le nom du contact pour le chantier",
        name: 'poc',
        sys_pn: "pocs-entry"
      }),
      Skeletons.List.Smart({
        className: `${ui.fig.family}__pocs content`,
        sys_pn: 'pocs-list',
        partHandler: [ui],
        itemsOpt: {
          service: 'select-poc',
          kind: 'poc_item',
          uiHandler: [ui],
        },
        api: {
          service: PLUGINS.poc.list,
          args:{
            addressId:ui.mget('addressId')
          }
        },
        vendorOpt: Preset.List.Orange_e,
      })
    ]
  });

};;
