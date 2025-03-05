// ==================================================================== *
//   Copyright Xialia.com  2011-2023
//   TYPE : Template
// ==================================================================== *
module.exports = function (m) {
  let html;
  const { chartId } = require('../../template/icon-name')(m);
  const type = m.filetype;
  if (m.imgCapable && m.drumate_id) {
    let url = `/_/avatar/${m.drumate_id}?type=vignette`
    html = `<div id="${m._id}-preview" class="full preview image-capable" 
        style="background-image:url(${url});"> 
      </div>`;
  } else {
    html = `<svg id="${m._id}-preview" class="full icon ${type}"> 
        ${Template.Xmlns(chartId)} \
        </svg>`;
  }
  return html;
};


