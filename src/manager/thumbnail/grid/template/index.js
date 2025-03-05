module.exports = function(_ui_, url){
  let html;
  const m = _ui_.model.toJSON();
  //m.imgCapable = _ui_.imgCapable();
  m.url = url || _ui_.url();
  m._id = _ui_._id;
  m.fig = _ui_.fig;

  html = require('./preview')(m) + require('./filename')(m);
  //html = html + require('../../template/checkbox')(m);
  return `<div class="full ${m.fig.family}__content ${m.filetype}">${html}</div>`;
};

