const { normalizelLocation } = require("../../utils")


/**
 * 
 * @param {*} ui 
 * @returns 
 */
export function siteHeader(ui) {
  let {
    location,
    city,
  } = ui.mget('site') || ui.model.toJSON();

  let fig = 'site'
  let kids = [
    Skeletons.Button.Svg({
      className: `${fig}-name ${fig}-icon`,
      ico: "maintenance",
    }),
    Skeletons.Note({
      className: `${fig}-city ${fig}-text`,
      content: city,
    }),
    Skeletons.Note({
      className: `${fig}-adress ${fig}-text`,
      content: normalizelLocation(location),
    })
  ]
  let a = Skeletons.Box.X({
    className: `${ui.fig.family}__site-header`,
    debug: __filename,
    service: "load-address-window",
    kidsOpt: {
      active: 0
    },
    kids
  })
  return a;
}
