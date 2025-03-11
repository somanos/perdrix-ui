// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *

module.exports = function(_ui_, header, size) {
  size = size || _ui_.size;
  if (size.height < 291) {
    size.height = 291;
  }

  const body = Skeletons.Box.Y({
    className: `${_ui_.fig.family}__body ${_ui_.fig.group}__body`,
    sys_pn   : _a.content,
    attrOpt  : { 
      placeholder : LOCALE.DROP_SECTIONS_HERE
    },
    type: _a.type
  });

   header.service = _e.raise; 

  const dialog = Skeletons.Wrapper.Y({
    className : `${_ui_.fig.group}__wrapper--modal dialog__wrapper--modal ${_ui_.fig.family}`,
    name      : "dialog"
  });
    //state     : state

  const tooltips =  Skeletons.Wrapper.Y({
    className : `${_ui_.fig.group}__wrapper-container`,
    name      :  "tooltips"
  });

  const a = Skeletons.Box.Y({
    className  : `${_ui_.fig.family}__main ${_ui_.fig.group}__main drive-popup`,
    radio      : _a.parent,
    debug      : __filename,
    kids       : [header, tooltips, body, dialog]});
  
  return a;
};;
