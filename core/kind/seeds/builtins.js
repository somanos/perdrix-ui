// @ts-nocheck
// On demand Classes cannot be overloaded

const a = {
  dock_minifier:function(s,f){import('src/manager/dock/widget/dock-minifier').then(m=>{s(m.default)}).catch(f)},
}


function get (name) {
  if(a[name]) return new Promise(a[name]);
  return null;
};
  
module.exports = {get};