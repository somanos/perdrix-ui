// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : router/skeleton/popup-info
//   TYPE : 
// ==================================================================== *

// ==================================================
//
// ===========================================================
const __acknowledge = function(_ui_, content, footer) {
  const pfx = `${_ui_.fig.group}__row`;
  const inner = Skeletons.Box.G({
    className: `${pfx}-container acknowledge`,
    kids: [
      Skeletons.Button.Svg({
        ico:'available',
        className: `${pfx}-icon acknowledge medium`
      }),
      Skeletons.Note({
        className: `${pfx}-label acknowledge`,
        content
      }),
    ]
  });

  const a = Skeletons.Box.Y({
    className : `${_ui_.fig.group}__acknowledge`,
    debug     : __filename, 
    kids  :[inner]
  })

  if(footer){
    a.kids.push(footer);
  }
  return a;
};
module.exports = __acknowledge;
