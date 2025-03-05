/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *

//-------------------------------------
// 
//-------------------------------------
const __media_icon=function(ui, chartId, cn, bc){
  if (bc == null) { bc = "icon"; }
  const html = `\
<svg id=\"${ui._id}-${cn}\" class=\"${bc} ${cn} \"> \
${Template.Xmlns(chartId)} \
</svg>\
`;

  return html;
};

module.exports = __media_icon;    

