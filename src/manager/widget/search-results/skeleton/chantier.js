/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function chantierview(ui) {
  const { nomClient, numVoie, typeVoie, nomVoie } = ui.mget(_a.content);

  const kids = [
    require('./cartridge')(ui, 'Nom du client', nomClient),
    require('./cartridge')(ui, 'Adresse du chantier',
      [numVoie, typeVoie, nomVoie].join(' ')),
  ]
  let icon = Skeletons.Button.Svg({
    className: `${ui.fig.family}__icon`,
    ico: "maintenance"
  })
  return { kids, icon };
}
module.exports = chantierview;