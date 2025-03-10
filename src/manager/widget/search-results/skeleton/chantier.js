/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function chantierview(ui) {
  let {
    nomClient, civilite, clientId, numVoie, typeVoie, nomVoie
  } = ui.mget(_a.content);

  if(civilite){
    nomClient = `${civilite} ${nom}`;
  }

  const itemId = ui.mget('itemId');
  const adresse = [numVoie, typeVoie, nomVoie].join(' ');
  const kids = [
    require('./header')(ui, 'maintenance', "Chantier"),
    require('./cartridge')(ui, 'Nom du client', nomClient, clientId),
    require('./cartridge')(ui, 'Adresse du chantier', adresse, itemId),
  ]
  return kids;
}
module.exports = chantierview;