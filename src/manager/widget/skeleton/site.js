const { normalizelLocation } = require("../../utils")

const { radioButtons } = require(".")
/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function placeView(ui, site) {
  let {
    location,
    postcode,
    city,
  } = site;

  return Skeletons.Box.G({
    className: `${ui.fig.family}__address`,
    debug: __filename,
    kids: [
      Skeletons.Button.Svg({
        className: `icon`,
        ico: "geolocation",
        state:0,
        service: _a.toggle,
      }),
      Skeletons.Note({
        className: `text`,
        content: normalizelLocation(location)
      }),
      Skeletons.Note({
        className: `text`,
        content: city,
      }),
      Skeletons.Note({
        className: `text`,
        content: postcode
      }),
    ]
  })
}

export function addressView(ui, site) {
  let { city, street, housenumber, postcode } = site;
  return Skeletons.Box.G({
    className: `${ui.fig.family}__cartridge`,
    debug: __filename,
    kids: [
      Skeletons.Note({
        className: `${ui.fig.family}__text`,
        content: housenumber,
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text`,
        content: street,
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text`,
        content: `${postcode}`,
      }),
      Skeletons.Note({
        className: `${ui.fig.family}__text`,
        content: `${city}`,
      })
    ]
  });
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function siteSelector(ui) {
  return radioButtons(ui, {
    name: "choice",
    service: "select-site",
    buttons: [
      { label: "Chez le client", state: 0, value: "same-address" },
      { label: "Choisir un chantier", state: 0, value: "list-sites" },
      { label: "Ajouter un chantier", state: 0, value: "add-site" },
    ],
  })
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function addressSmallView(ui) {
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