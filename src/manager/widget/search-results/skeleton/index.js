/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function found_item(ui) {
  let kids = [];
  switch (ui.mget('ctype')) {
    case 'site':
      kids = require('./site')(ui);
      break;
    case 'customer':
      kids = require('./customer')(ui);
      break;
    case 'poc':
      kids = require('./poc')(ui);
      break;
    case 'work':
      kids = require('./work')(ui);
      break;
    default:
      kids = require('./header')(ui, 'account_contacts', "Type se donnees inconnues")
  }
  const skeleton = Skeletons.Box.Y({
    className: `${ui.fig.family}__main ${ui.mget('ctype')}`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.Y({
        className: `${ui.fig.family}__container`,
        kids,
      })
    ]
  })

  return skeleton;
}
module.exports = found_item;