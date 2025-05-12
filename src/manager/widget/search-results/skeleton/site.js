/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { normalizelLocation } = require("../../../utils")
/**
 * 
 * @param {*} ui 
 * @returns 
 */
function siteSkl(ui) {
  let { location, siteId, custName, custId, gender, city } = ui.data();

  if (gender) {
    custName = `${gender} ${custName}`;
  }

  const adresse = normalizelLocation(location);
  const kids = [
    require('./header')(ui, 'maintenance', "Chantier", city),
    require('./cartridge')(ui, 'Nom du client', custName, custId),
    require('./cartridge')(ui, 'Adresse du chantier', adresse, siteId),
  ]
  return kids;
}
module.exports = siteSkl;