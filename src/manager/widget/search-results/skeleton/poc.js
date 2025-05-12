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
const LABELS = [
  "Tel. bureau",
  "Tel. domicile",
  "Tel. portable",
  "Fax"
]
function contactchantierview(ui) {
  let {
    custName, location, custId, gender, phones, email, category, pocName
  } = ui.data();
  if (gender) custName = `${gender} ${custName}`;
  if (category) custName = `${custName} (${category})`;

  let i = 0;
  let contacts = [];
  for (let num of phones) {
    if (num) {
      contacts.push(require('./cartridge')(ui, LABELS[i], num))
    }
    i++;
  }
  const adresse = normalizelLocation(location);

  const kids = [
    require('./header')(ui, 'desktop_mysharing', "Contact Chantier"),
    require('./cartridge')(ui, 'Nom du contact', `${pocName}`),
    require('./cartridge')(ui, 'Email', email),
    ...contacts,
    // require('./cartridge')(ui, 'Nom du client', custName, custId),
    // require('./cartridge')(ui, 'Adresse du client', adresse)
  ]
  return kids;
}
module.exports = contactchantierview;