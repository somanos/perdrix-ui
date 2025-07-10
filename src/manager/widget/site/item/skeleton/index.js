/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const {
  addressSmallView
} = require("../../../../widget/skeleton")


/**
 * 
 * @param {*} ui 
 * @returns 
 */

function header(ui, ico, custName) {
  let icon = Skeletons.Button.Svg({
    className: `${ui.fig.family}__icon-header ${ui.mget(_a.type)}`,
    ico,
  })
  let origin = ui.mget(_a.origin) || "";
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__cartridge-header`,
    debug: __filename,
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__text type ${origin}`,
        kids: [
          icon,
        ]
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text id`,
        content: custName
      }),
    ]
  })
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function site_item(ui) {

  let { custName, gender, location, companyclass, category, customer } = ui.model.toJSON();
  let adresse = "";
  if (location) {
    adresse = location.join(' ');
  }
  gender = gender || customer.gender;
  custName = custName || customer.custName;
  if (gender) {
    custName = `${gender} ${custName}`;
  }
  if (companyclass) {
    custName = `${custName} (${companyclass})`;
  }

  let icon = 'maintenance';

  if (category == 0) {
    icon = 'company';
  }
  const kids = [
    header(ui, icon, custName),
    addressSmallView(ui),
  ]

  return Skeletons.Box.G({
    className: `${ui.fig.family}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.G({
        className: `${ui.fig.family}__container`,
        kids,
      })
    ]
  })

}

module.exports = site_item;