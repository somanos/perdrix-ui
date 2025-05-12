/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */
const { normalizelLocation } = require("../../../utils")

function customerview(ui) {
  let { gender, custName, location, city } = ui.data();
  const adresse = normalizelLocation(location);
  let ico = 'account_contacts';
  if (gender) {
    custName = `${gender} ${custName}`;
  } else {
    ico = 'company';
  }

  const kids = [
    require('./header')(ui, ico, "Client", city),
    require('./cartridge')(ui, 'Nom', custName),
    require('./cartridge')(ui, 'Adresse', adresse),
  ]
  return kids;
}
module.exports = customerview;