const { entry } = require("./")

export function pocsList(ui) {
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__pocs main`,
    radio: _a.parent,
    debug: __filename,
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__buttons`,
        kids: [
          entry(ui, {
            className: `${ui.fig.family}__pocs searchbox`,
            placeholder: "Chercher un contact existant",
            name: 'poc',
            sys_pn: "pocs-entry"
          }),
          Skeletons.Note({
            className: `${ui.fig.family}__pocs button`,
            content : "Ajouter un nouveau contant"
          })
        ]
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
          service: PLUGINS.poc.list
        },
        vendorOpt: Preset.List.Orange_e,
      })
    ]
  });

};;
