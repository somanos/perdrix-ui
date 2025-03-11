/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function client_item(ui) {
  const {
    civilite, nom, stype, numVoie, typeVoie, nomVoie, prenom, categorie
  } = ui.model.toJSON();
  const adresse = [numVoie, typeVoie, nomVoie].join(' ');

  let nomClient = nom || "";
  nomClient = nomClient.toUpperCase()
  if (prenom) {
    nomClient = `${nomClient} ${prenom}`;
  }
  if (civilite) {
    nomClient = `${civilite} ${nom}`;
  }
  if (stype) {
    nomClient = `${nom} (${stype})`;
  }
  let icon = 'account_contacts';
  if (categorie == 0) {
    icon = 'company';
  }
  const kids = [
    require('./header')(ui, icon, nomClient),
    require('./cartridge')(ui, { text: adresse }),
  ]

  return Skeletons.Box.X({
    className: `${ui.fig.family}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__container`,
        kids,
      })
    ]
  })

}
module.exports = client_item;