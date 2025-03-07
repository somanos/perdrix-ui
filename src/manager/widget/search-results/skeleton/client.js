/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function clientview(ui) {
  const { clientId, nom, numVoie, typeVoie, nomVoie } = ui.mget(_a.content);
  const adresse = [numVoie, typeVoie, nomVoie].join(' ');
  const kids = [
    require('./header')(ui, 'account_contacts', "Client"),
    require('./cartridge')(ui, 'Nom', nom, clientId),
    require('./cartridge')(ui, 'Adresse', adresse, clientId),
  ]
  return kids;
}
module.exports = clientview;