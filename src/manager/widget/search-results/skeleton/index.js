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
  //let { siteId, custId, pocId, workId } = ui.mget(_a.content);
  let type = ui.mget(_a.type);
  switch (type) {
    case 'address':
      kids = require('./address')(ui);
      break;
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
    case 'bill':
      kids = require('./bill')(ui);
      break;
    case 'quote':
      kids = require('./quote')(ui);
      break;
    default:
      kids = require('./header')(ui, 'account_contacts', `Type de donnees inconnues:${type}`)
  }

  const skeleton = Skeletons.Box.Y({
    className: `${ui.fig.family}__main ${ui.mget(_a.type)}`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.G({
        className: `${ui.fig.family}__container`,
        dataset: { type: ui.mget(_a.type) },
        kids,
      })
    ]
  })

  return skeleton;
}
module.exports = found_item;