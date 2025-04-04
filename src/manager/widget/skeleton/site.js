
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
    service: _a.toggle,
    state: 1,
    kidsOpt: {
      active: 0
    },
    kids: [
      Skeletons.Button.Svg({
        className: `icon`,
        ico: "geolocation"
      }),
      Skeletons.Note({
        className: `text`,
        content: location.join(' '),
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
      { label: "Meme addresse", state: 1, value: "same-address" },
      { label: "Choisir un chantier", state: 0, value: "list-sites" },
      { label: "Ajouter un chantier", state: 0, value: "add-site" },
    ],
  })
}
