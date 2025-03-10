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
    case 'chantier':
      kids = require('./chantier')(ui);
      break;
    case 'client':
      kids = require('./client')(ui);
      break;
    case 'contactChantier':
      kids = require('./contactChantier')(ui);
      break;
    case 'travaux':
      kids = require('./travaux')(ui);
      break;
    default:
      kids = require('./header')(ui, 'account_contacts', "Type se donnees inconnues")
  }
  const skeleton = Skeletons.Box.Y({
    className: `${ui.fig.family}__main ${ui.mget('ctype')}`,
    debug: __filename,
    kids: [
      Skeletons.Box.Y({
        className: `${ui.fig.family}__container`,
        kids
      })
    ]
  })

  return skeleton;
}
module.exports = found_item;