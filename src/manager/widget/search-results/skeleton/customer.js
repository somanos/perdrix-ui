/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function customerview(ui) {
  let { gender, custId, custName, location } = ui.mget(_a.content);
  const adresse = location.join(' ');

  if(gender){
    custName = `${gender} ${nom}`;
  }

  const kids = [
    require('./header')(ui, 'account_contacts', "Client"),
    require('./cartridge')(ui, 'Nom', custName, custId),
    require('./cartridge')(ui, 'Adresse', adresse, custId),
  ]
  return kids;
}
module.exports = customerview;