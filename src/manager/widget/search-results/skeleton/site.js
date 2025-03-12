/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function siteSkl(ui) {
  let {
    custName, location, custId, gender
  } = ui.mget(_a.content);

  if (gender) {
    custName = `${gender} ${custName}`;
  }

  const itemId = ui.mget('itemId');
  const adresse = location.join(' ');
  const kids = [
    require('./header')(ui, 'maintenance', "Chantier"),
    require('./cartridge')(ui, 'Nom du client', custName, custId),
    require('./cartridge')(ui, 'Adresse du chantier', adresse, itemId),
  ]
  return kids;
}
module.exports = siteSkl;