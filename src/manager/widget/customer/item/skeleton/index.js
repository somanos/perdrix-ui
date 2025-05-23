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
 * @param {*} ico 
 * @returns 
 */
function feature(ui) {
  let origin = ui.mget(_a.origin) || "";
  let { gender, custName } = ui.model.toJSON();
  let ico = 'account_contacts';
  if (gender) {
    custName = `${gender} ${custName}`;
  } else {
    ico = 'company';
  }


  return Skeletons.Box.Y({
    className: `${ui.fig.family}__cartridge-header`,
    debug: __filename,
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__text type ${origin}`,
        kids: Skeletons.Button.Svg({
          className: `${ui.fig.family}__icon-header ${ui.mget(_a.type)}`,
          ico,
        })
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text id`,
        content: `Client n° ${ui.mget('custId')}`
      }),
    ]
  })
}

/**
 * 
 * @param {*} ui 
 * @param {*} ico 
 * @returns 
 */
function identity(ui) {
  let { gender, custName, city } = ui.model.toJSON();
  if (gender) {
    custName = `${gender} ${custName}`;
  }


  return Skeletons.Box.Y({
    className: `${ui.fig.family}__cartridge-header`,
    debug: __filename,
    kids: [
      Skeletons.Note({
        className: `${ui.fig.family}__text id`,
        content: custName
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text id`,
        content: city,
      }),
    ]
  })
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function customer_item(ui) {

  let { custName, gender, location, companyclass, category } = ui.model.toJSON();
  let adresse = "";
  if (location) {
    adresse = location.join(' ');
  }

  if (gender) {
    custName = `${gender} ${custName}`;
  }
  if (companyclass) {
    custName = `${custName} (${companyclass})`;
  }

  let icon = 'account_contacts';

  if (category == 0) {
    icon = 'company';
  }
  const kids = [
    feature(ui),
    identity(ui),
    addressSmallView(ui),
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