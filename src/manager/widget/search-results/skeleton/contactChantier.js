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
  const {
    nomClient, numVoie, typeVoie, nomVoie, clientId, civilite,
    nom, telBureau, telDom, mobile, fax, email, categorie
  } = ui.mget(_a.content);
  let name = `${civilite} ${nom}`;
  if (categorie) name = `${name} (${categorie})`;
  let telbur, teldom, telport, telecopy;
  if (telBureau) telbur = require('./cartridge')(ui, 'Telephone Bureau', telBureau);
  if (telDom) teldom = require('./cartridge')(ui, 'Telephone Bureau', telBureau);
  if (mobile) telport = require('./cartridge')(ui, 'Telephone Bureau', telBureau);
  if (fax) telecopy = require('./cartridge')(ui, 'Telephone Bureau', telBureau);

  const kids = [
    require('./header')(ui, 'desktop_mysharing', "Contact Chantier"),
    require('./cartridge')(ui, 'Nom du contact', `${name}`),
    require('./cartridge')(ui, 'Email', email),
    telBureau, telDom, mobile, telecopy,
    require('./cartridge')(ui, 'Nom du client', nomClient, clientId),
    require('./cartridge')(ui, 'Adresse du client',
      [numVoie, typeVoie, nomVoie].join(' '), clientId)
  ]
  return kids;
}
module.exports = contactchantierview;