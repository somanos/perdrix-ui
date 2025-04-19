/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
/**
 * 
 * @param {*} ui 
 * @returns 
 */

function site_item(ui) {
  let { postcode, city, location } = ui.model.toJSON();
  let place;
  if(_.isArray(location)){
    place = location.join(' ')
  }else{
    place = location
  }
  let pfx = ui.fig.family;
  return Skeletons.Box.X({
    className: `${pfx}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.G({
        className: `${pfx}__content`,
        kids: [
          Skeletons.Note({
            className: `${pfx}__text`,
            content: place
          }),
          Skeletons.Note({
            className: `${pfx}__text`,
            content: city
          }),
          Skeletons.Note({
            className: `${pfx}__text`,
            content: postcode
          }),
        ]
      }),
    ]
  })

}
module.exports = site_item;