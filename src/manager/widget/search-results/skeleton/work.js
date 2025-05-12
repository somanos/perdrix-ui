/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function workSkl(ui) {
  let { custName, gender, type, description, city } = ui.data();

  let title = `Missions`;

  if (type) {
    title = `${title} (${type})`;
  }

  if (gender) {
    custName = `${gender} ${custName}`;
  }

  const kids = [
    require('./header')(ui, 'desktop_desksettings', title, city),
    require('./cartridge')(ui, 'Nom du client', custName),
    require('./cartridge')(ui, 'Description', description),
    // require('./cartridge')(ui, 'Montant HT', ht),
    // require('./cartridge')(ui, `TVA (${taux_tva*100})`, val_tva),
    // require('./cartridge')(ui, 'Montant TTC', ttc),
    // require('./cartridge')(ui, 'Document', docId),
  ]
  return kids;
}
module.exports = workSkl;