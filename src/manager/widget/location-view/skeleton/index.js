/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
/**
 * 
 * @param {*} ui 
 * @returns 
 */

function locaion_view(ui) {
  let {
    location,
    postcode,
    city,
  } = ui.model.toJSON();

  let body = [
    Skeletons.Box.G({
      className: `${ui.fig.family}__address`,
      debug: __filename,
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
    }),
    Skeletons.Box.Y({
      className: `${ui.fig.family}__map`,
      sys_pn: "map-container",
      state: 0,
      kids: [
        Skeletons.Element({
          className: `${ui.fig.family}__map-content`,
          id: `${ui.get(_a.widgetId)}-map`
        })
      ]
    })
  ]
  return Skeletons.Box.Y({
    className: `${ui.fig.family}__main`,
    debug: __filename,
    kids: body
  })

}
module.exports = locaion_view;