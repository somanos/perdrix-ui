function customerTabs(ui) {
  let pfx = ui.fig.family;
  let item = ui.fig.name;
  return Skeletons.Box.X({
    className: `${pfx}__tabs`,
    kidsOpt: {
      className: `${item}__button`,
      radio: `${ui.cid}-tabs`,
      labelClass: `${item}__label contacts`,
    },
    kids: [
      Skeletons.Button.Label({
        ico: 'desktop_mysharing',
        label: 'Contacs',
        service: 'show-contacts',
      }),
      Skeletons.Button.Label({
        ico: 'desktop_picture',
        label: 'Photos',
        service: 'show-photos',
      }),
      Skeletons.Button.Label({
        ico: 'editbox_pencil',
        label: 'Notes',
        service: 'show-notes',
      }),
      Skeletons.Button.Label({
        ico: 'desktop_desksettings',
        label: 'Travaux',
        service: 'show-work',
      }),
      Skeletons.Button.Label({
        ico: 'editbox_openmenu',
        label: 'Solde',
        service: 'show-solde',
      }),
    ]
  });
};

module.exports = customerTabs;