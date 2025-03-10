/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function travauxView(ui) {
  let {
    nomClient, folderId, clientId, civilite,
    typeTravail, ttc, ht, taux_tva, val_tva,  description
  } = ui.mget(_a.content);

  let title = `Travaux`;

  if(typeTravail){
    title = `${title} (${typeTravail})`;
  }

  if(civilite){
    nomClient = `${civilite} ${nomClient}`;
  }

  const kids = [
    require('./header')(ui, 'desktop_desksettings', title),
    require('./cartridge')(ui, 'Nom du client', nomClient, clientId),
    require('./cartridge')(ui, 'Description', description),
    require('./cartridge')(ui, 'Montant HT', ht),
    require('./cartridge')(ui, `TVA (${taux_tva*100})`, val_tva),
    require('./cartridge')(ui, 'Montant TTC', ttc),
    require('./cartridge')(ui, 'Document', folderId),
  ]
  return kids;
}
module.exports = travauxView;