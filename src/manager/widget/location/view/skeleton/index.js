/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
const { placeView } = require("../../../skeleton")

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function locaion_view(ui) {
  let body = [
    // Skeletons.Box.G({
    //   className: `${ui.fig.family}__address`,
    //   debug: __filename,
    //   service: _a.toggle,
    //   state: 0,
    //   kids: [
    //     Skeletons.Button.Svg({
    //       className: `icon`,
    //       ico: "geolocation"
    //     }),
    //     Skeletons.Note({
    //       className: `text`,
    //       content: location.join(' '),
    //     }),
    //     Skeletons.Note({
    //       className: `text`,
    //       content: city,
    //     }),
    //     Skeletons.Note({
    //       className: `text`,
    //       content: postcode
    //     }),
    //   ]
    // }), 

    placeView(ui, ui.model.toJSON()),
    Skeletons.Box.Y({
      className: `${ui.fig.family}__photo`,
      sys_pn: "photo-container",
      state: 0,
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