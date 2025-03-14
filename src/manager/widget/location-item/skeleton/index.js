/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function location_item(ui) {
  let { city, street, housenumber, postcode} = ui.mget('properties') || {};
  let kids = Skeletons.Box.G({
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

  return Skeletons.Box.X({
    className: `${ui.fig.family}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__container`,
        kids,
      })
    ]
  })

}
module.exports = location_item;