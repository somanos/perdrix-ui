/**
 * 
 * @param {*} ui 
 * @returns 
 */

function cartridge(ui) {
  let { location, postcode, city } = ui.model.toJSON();
  const adresse = location.join(' ');

  // let kids = [
  //   Skeletons.Note({
  //     className: `${ui.fig.family}__label`,
  //     content: label,
  //     service,
  //     itemId,
  //     type
  //   }),
  //   Skeletons.Box.Y({
  //     className: `${ui.fig.family}__address`,
  //     kids: [
  //       Skeletons.Note({
  //         className: `${ui.fig.family}__text`,
  //         content: adresse,
  //         service,
  //         itemId,
  //         type
  //       }),
  //       Skeletons.Note({
  //         className: `${ui.fig.family}__text`,
  //         content: `${postcode} ${city}`,
  //         service,
  //         itemId,
  //         type
  //       })
  //     ]
  //   })
  // ];
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__cartridge`,
    debug: __filename,
    kids: [
      Skeletons.Note({
        className: `${ui.fig.family}__text`,
        content: adresse,
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text`,
        content: `${postcode} ${city}`,
      })
    ]
  })
}
module.exports = cartridge;