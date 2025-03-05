// ==================================================================== *
//   Copyright Xialia.com  2011-2021
//   FILE : /src/drumee/builtins/media/grid/template/filename.coffee
//   TYPE : Skeleton
// ==================================================================== *

//-------------------------------------
// 
//-------------------------------------
const __media_filename = function (m) {
  let html;
  const filename = m.filename || LOCALE.PROCESSING;

  let v = '';
  if (m.imgCapable) {
    v = 'image-capable';
  }
  //console.log("AAA:18", m);
  html = `<div id="${m._id}-filename" class="filename ${m.filetype} ${v}"> ${filename} </div>`;

  if (filename && (filename.length > 20)) {
    const tooltips = `<div id="${m._id}-tooltips" class="filename-tooltips ${m.filetype}">${filename}</div>`;
    return html + tooltips;
  }

  return html;
};

module.exports = __media_filename;    
