/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function clientview(ui) {
  const { nomClient, numVoie, typeVoie, nomVoie } = ui.mget(_a.content);

  const kids = [
    require('./cartridge')(ui, 'Nom', nomClient),
    require('./cartridge')(ui, 'Adresse', [numVoie, typeVoie, nomVoie].join(' ')),
  ]
  
  let icon = Skeletons.Button.Svg({
    className: `${ui.fig.family}__icon`,
    ico: "account_contacte"
  })

  return {kids, icon};
}
module.exports = clientview;