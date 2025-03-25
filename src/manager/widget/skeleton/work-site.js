/**
 * 
 * @param {*} ui 
 * @returns 
 */

export function workSite(ui, site) {
  let {
    location,
    postcode,
    city,
  } = site.model.toJSON();

  let fig = 'work-site'

  let kids = [
    Skeletons.Button.Svg({
      className: `${fig}-geoloc ${fig}-icon`,
      ico: "geolocation"
    }),
    Skeletons.Note({
      className: `${fig}-adress ${fig}-text`,
      content: location.join(' '),
    }),
    Skeletons.Note({
      className: `${fig}-city ${fig}-text`,
      content: city,
    }),
    Skeletons.Note({
      className: `${fig}-city ${fig}-text`,
      content: postcode
    }),
  ]
  return Skeletons.Box.G({
    className: `${ui.fig.family}__work-site`,
    debug: __filename,
    kids
  })
}
