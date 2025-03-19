/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function work_item(ui) {
  let { city, street, housenumber, postcode} = ui.mget('properties') || {};
  let kids = Skeletons.Box.X({
    className: `${ui.fig.family}__actions`,
    debug: __filename,
    kids: [
      Skeletons.Note({
        className: `button`,
        content: housenumber,
      }),
      Skeletons.Note({
        className: `button`,
        content: `${postcode}`,
      }),
      Skeletons.Note({
        className: `button`,
        content: `${postcode}`,
      }),
      Skeletons.Note({
        className: `button`,
        content: `${postcode}`,
      }),
      Skeletons.Note({
        className: `button`,
        content: `${postcode}`,
      }),
      Skeletons.Note({
        className: `button`,
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
module.exports = work_item;