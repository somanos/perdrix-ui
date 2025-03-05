/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function skl_client_list(ui) {
  let kids = [];
  let icon = null;
  this.debug(`AAAA:15`, ui.mget('ctype'))
  switch (ui.mget('ctype')) {
    case 'chantier':
      ({ kids, icon } = require('./chantier')(ui));
      break;
    case 'client':
      ({ kids, icon } = require('./client')(ui));
      break;
    case 'contactChantier':
      ({ kids, icon } = require('./contactChantier')(ui));
      break;
  }
  const skeleton = Skeletons.Box.Y({
    className: `${ui.fig.family}__main`,
    debug: __filename,
    kids: [
      icon,
      Skeletons.Box.Y({
        className: `${ui.fig.family}__container`,
        kids
      })
    ]
  })

  return skeleton;
}
module.exports = skl_client_list;