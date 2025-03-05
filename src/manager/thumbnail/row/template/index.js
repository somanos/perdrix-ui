// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *

//-------------------------------------
// 
//-------------------------------------
const __media_tpl_row=function(_ui_){

  const m = _ui_.model.toJSON();
  m.imgCapable = _ui_.imgCapable();
  m.url = _ui_.url();
  m._id = _ui_._id;
  m.fig = _ui_.fig;

  const checkbox  = require('../../template/checkbox')(m);
  let preview  = require('./preview')(m);
  const protect = '';// require('../../template/protected')(m)

  const filename = require('./filename')(m);
  const name = `<div class=\"box ${m.fig.family}__field-filename\" data-flow=\"x\"> \
${filename} \
</div>`;
  preview = `<div class=\"box ${m.fig.family}__field-preview\" data-flow=\"x\"> \
${preview + protect} \
</div>`;
  let html = checkbox + preview + name;

  if (m.isalink && (m.filetype !== _a.hub)) {
    html = html + require('../../template/shortcut')(m);
  }
  // else
  //   html = html + require('../../template/sync-menu')(m, 'new_sync')

  let t = '';
  if (Utils.debugMode()) {
    t = `data-debug=\"${__filename}\"`;
  }
  return `<div class=\"box ${m.fig.family}__main\" data-flow=\"g\" ${t}>${html}</div>`;
};

module.exports = __media_tpl_row;    
