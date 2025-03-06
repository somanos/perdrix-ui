/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function contactchantierview(ui) {
  const { nomClient, numVoie, typeVoie, nomVoie, nom, telBureau, telDom, mobile, fax } = ui.mget(_a.content);
  const kids = [
    require('./header')(ui, 'user_settings', "Contact Chantier"),
    require('./cartridge')(ui, 'Nom du contact', nom),
    require('./cartridge')(ui, 'Telephone Bureau', telBureau),
    require('./cartridge')(ui, 'Telephone Domicile', telDom),
    require('./cartridge')(ui, 'Telephone mobile', mobile),
    require('./cartridge')(ui, 'Fax', fax),
    require('./cartridge')(ui, 'Nom du contact', nomClient),
    require('./cartridge')(ui, 'Nom du client', nomClient),
    require('./cartridge')(ui, 'Adresse du client', [numVoie, typeVoie, nomVoie].join(' '))
  ]
  return kids;
}
module.exports = contactchantierview;