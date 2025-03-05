// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   FILE : liceman\src\manager\skeleton\form\user-details.js
//   TYPE : Skeleton
// ==================================================================== *

module.exports = function (_ui_, opt) {
  const formFig = `${_ui_.fig.group}__row`;
  let {label, itemService, cancelService, icon, partName} = opt;
  const inner = Skeletons.Box.G({
    className: `${formFig}-container ${_ui_.fig.family}__action`,
    kids: [
      Skeletons.Button.Svg({
        ico: icon,
        className: `${formFig}-icon type-info`,
        service : itemService
      }),
      Skeletons.Note({
        className : `${formFig}-label`,
        content   : label,
        service : itemService
      }),
      Skeletons.Button.Svg({
        ico: 'cross',
        className: `${formFig}-icon action small`,
        service : cancelService
      })
    ]
  });
  const a = Skeletons.Box.X({
    sys_pn : partName || 'mini-view',
    className: `${formFig}-wrapper`,
    kids:[inner]
  })
  return a;
};
