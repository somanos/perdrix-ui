// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : router/skeleton/popup-info
//   TYPE : 
// ==================================================================== *

// ==================================================
//
// ===========================================================
const __acknowledge = function(_ui_, content) {
  const a = Skeletons.Box.X({
    className : `${_ui_.fig.family}__acknowledge`,
    debug     : __filename, 
    kids : [
      Skeletons.Button.Svg({
        ico       : 'available',
        className : 'icon'
      }),

      Skeletons.Note({
        className : 'text',
        content,
      })
    ]});


  return a;
};
module.exports = __acknowledge;
