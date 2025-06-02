/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function header(ui, ico, t1, t2) {

  return Skeletons.Box.Y({
    className: `${ui.fig.family}__reference`,
    debug: __filename,
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__reference-row`,
        debug: __filename,
        kids: [
          Skeletons.Note({
            className: `${ui.fig.family}__text`,
            ico,
          }),
          Skeletons.Note({
            className: `${ui.fig.family}__text type`,
            content:t1
          }),
        ]
      })
    ]
  })

}
module.exports = header;