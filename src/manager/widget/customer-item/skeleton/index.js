/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function customer_item(ui) {

  let { custName, gender, location, compType, category } = ui.model.toJSON();
  let adresse = "";
  if (location) {
    adresse = location.join(' ');
  }

  if (gender) {
    custName = `${gender} ${custName}`;
  }
  if (compType) {
    custName = `${custName} (${compType})`;
  }

  let icon = 'account_contacts';

  if (category == 0) {
    icon = 'company';
  }
  const kids = [
    require('./header')(ui, icon, custName),
    require('./cartridge')(ui),
  ]

  return Skeletons.Box.X({
    className: `${ui.fig.family}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__container`,
        kids,
      })
    ]
  })

}
module.exports = customer_item;