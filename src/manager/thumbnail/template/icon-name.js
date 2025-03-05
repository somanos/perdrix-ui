// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *
const _file_icon = require('./map');


//-------------------------------------
// 
//-------------------------------------
const __icon_name = function (m) {
  let chartId, ext;
  switch (m.filetype) {
    case 'perdrix':
      chartId = "gen-certificate";
      break;
    case 'customer':
      chartId = "account";
      break;
    case 'contact':
      chartId = "desktop_contactbook";
      break;
    case 'company':
      chartId = "company";
      break;
    default:
      chartId = "desktop_docfile";
  }
  return { chartId, ext };
};

module.exports = __icon_name;

