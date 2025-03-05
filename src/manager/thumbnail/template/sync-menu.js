// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : __dbg_path
//   TYPE : Skelton
// ==================================================================== *
const __sync=function(m){
  let iconName = null;
  const {fromBitwise} = require('src/drumee/widgets/electron/sync-utils');
  const {mode} = fromBitwise(m.flags);
  console.log("AAAA:9", m.flags, m.filename, fromBitwise(m.flags));
  switch (mode) {
    case 'integral': 
      iconName = 'new_sync';
      break;
    case 'gradual':
      iconName = 'tool_rotate';
      break;
    case 'disabled':
      iconName = 'account_info';
      break;
  }

  if (!iconName) {
    return '';
  }

  const html = `\
<div id=\"${m._id}-sync\" data-service=\"sync-option\" class=\"sync-menu ${m.filetype} sync-menu__trigger\"> \
<svg id=\"${m._id}-icon \" class=\"sync-menu-icon ${m.filetype}\"> \
${Template.Xmlns(iconName)} \
</svg> \
</div>\
`;
  return html;
};

module.exports = __sync;    
