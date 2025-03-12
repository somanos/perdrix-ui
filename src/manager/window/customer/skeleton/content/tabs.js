function customerTabs(ui) {
  let pfx = ui.fig.family;
  let item = ui.fig.name;
  return Skeletons.Box.X({
    className: `${pfx}__tabs`,
    kids: [
      Skeletons.Button.Label({
        ico: 'desktop_mysharing',
        className: `${item}__button`,
        labelClass: `${item}__label contacts`,
        label: 'Contacs',
        service: 'show-contacts',
      }),
      Skeletons.Button.Label({
        ico: 'desktop_picture',
        className: `${item}__button`,
        labelClass: `${item}__label photos`,
        label: 'Photos',
        service: 'show-photos',
      }),
      Skeletons.Button.Label({
        ico: 'editbox_pencil',
        className: `${item}__button`,
        labelClass: `${item}__label notes`,
        label: 'Contacs',
        service: 'show-notes',
      }),
      Skeletons.Button.Label({
        ico: 'desktop_desksettings',
        className: `${item}__button`,
        labelClass: `${item}__label travaux`,
        label: 'Travaux',
        service: 'show-travaux',
      }),
      Skeletons.Button.Label({
        ico: 'editbox_openmenu',
        className: `${item}__button`,
        labelClass: `${item}__label solde`,
        label: 'Solde',
        service: 'show-solde',
      }),
    ]
  });
};

module.exports = customerTabs;