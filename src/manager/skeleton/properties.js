// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : src/drumee/builtins/desk/skeleton/window 
//   TYPE : 
// ==================================================================== *


// ======================================================
// Desk content _ui_
// ======================================================

const __properties=function(_ui_, text) {

  const a = Skeletons.Box.Y({
    debug : __filename,
    className  : `${_ui_.fig.family}__properties-container`,
    kids : [
      Preset.Button.Close(_ui_, 'close-alert'),
      Skeletons.List.Smart({
        className  : `${_ui_.fig.family}__properties-content`,
        kids:[Skeletons.Note({
          className  : `${_ui_.fig.family}__properties-text`,
          content:text.trim()
        })]})
    ]});

  return a;
};

module.exports = __properties;
