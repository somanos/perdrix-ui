/* ==================================================================== *
* Widget skeleton automatically generated on 2025-03-05T03:29:33.857Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */
/**
 * 
 * @param {*} ui 
 * @param {*} opt 
 * @returns 
 */
function entry(ui) {
  let { value, name, placeholder } = ui.model.toJSON();
  const pfx = `${ui.fig.family}__entry ${name}`;
  let args = {
    className: `${pfx} entry`,
    name,
    value,
    formItem: name,
    innerClass: name,
    mode: _a.interactive,
    service: _a.input,
    placeholder,
    uiHandler: [ui],
    errorHandler: [ui],
    sys_pn: "entry",
    partHandler: [ui]
  }

  return Skeletons.Entry(args)
}

/**
 * 
 * @param {*} ui 
 * @returns 
 */

function menu_input(ui) {
  let Container, Main, Items;
  if (ui.mget(_a.axis == _a.x)) {
    Container = Skeletons.Box.X;
    Main = Skeletons.Box.X;
    Items = Skeletons.Wrapper.X;
  } else {
    Container = Skeletons.Box.Y;
    Main = Skeletons.Box.Y;
    Items = Skeletons.Wrapper.Y;
  }
  let kids = Main({
    className: `${ui.fig.family}__main`,
    debug: __filename,
    kids: [
      entry(ui),
      Skeletons.Box.X({
        className: `${ui.fig.family}__items-wrapper`,
        dataset: {
          axis: ui.mget(_a.axis)
        },
        sys_pn: "wrapper",
        kids: Items({
          className: `${ui.fig.family}__items-content`,
          dataset: {
            axis: ui.mget(_a.axis)
          },
          sys_pn: "items"
        })
      }),
    ]
  });
  return Container({
    className: `${ui.fig.family}__main`,
    debug: __filename,
    uiHandler: [ui],
    kids: [
      Skeletons.Box.X({
        className: `${ui.fig.family}__container`,
        kids,
      })
    ]
  });
}
module.exports = menu_input;