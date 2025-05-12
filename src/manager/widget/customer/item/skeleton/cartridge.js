const { normalizelLocation } = require("../../../../utils")

/**
 * 
 * @param {*} ui 
 * @returns 
 */
function cartridge(ui) {
  let { location, postcode, city } = ui.model.toJSON();
  const adresse = normalizelLocation(location);
  let origin = ui.mget(_a.origin) || "";

  return Skeletons.Box.Y({
    className: `${ui.fig.family}__cartridge`,
    debug: __filename,
    kids: [
      Skeletons.Note({
        className: `${ui.fig.family}__text ${origin}`,
        content: adresse,
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text ${origin}`,
        content: `${postcode} ${city}`,
      })
    ]
  })
}
module.exports = cartridge;