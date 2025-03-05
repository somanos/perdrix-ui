/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : libs/reader/image/preview.coffee
//   TYPE : 
// ==================================================================== *

//-------------------------------------
// 
//-------------------------------------
// _video=(m)->
//   html = "
//     <div class=\"box full\" data-flow=\"v\">
//       <div class=\"box icon-row\" data-flow=\"v\">
//         <video class=\"icon-row vdo-bg fill-up margin-auto\" 
//           autobuffer=\"autobuffer\" muted=\"muted\" preload=\"auto\" 
//           loop=\"loop\" src=#{m.src} img=#{m.img}
//           data-flow=\"v\" data-justify=\"left\">
//         </video>
//       </div>
//       <div class=\"box\" data-flow=\"v\" style=\"width: 50%\">
//         <div class=\"base widget note-reader\" data-justify=\"left\" data-flow=\"h\">
//         <div class=\"full\"><b>#{m.filename}</b></div>
//       </div>
//       <div class=\"box\" data-flow=\"v\" s
//       tyle=\"width: 20%\" title=\"#{m.date}\">#{m.age}</div>
//     </div>
//   "

//
//-------------------------------------
// 
//-------------------------------------
const _image=function(view){
  let html;
  const m = view.model;
  return html = `\
<div class=\"content-preview full ${m.get(_a.filetype)}\" \
style=\"background: url() no-repeat 50% 50%; background-size: cover;\"> \
</div>\
`;
};


//-------------------------------------
// 
//-------------------------------------
const _icon=function(view, chartId){
  const m = view.model;
  switch (m.get(_a.filetype)) {
    case _a.image:
      chartId = "editbox_picture";
      break;
    case _a.folder: 
      chartId = _a.folder; 
      break;
    case _a.video:
      chartId = "editbox_video";
      break;
    case _a.document:
      chartId = "editbox_doc";
      break;
    case _a.hub:
      chartId = "editbox_webpage";
      break;
  }
  const html = `\
<svg class=\"full icon ${m.get(_a.filetype)} ${m.get(_a.area)}\"> \
<use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#--icon-${chartId}\"></use> \
</svg> \
<div id=\"${view._id}-filename\" class=\"filename\">${m.get(_a.filename)}</div>\
`;
  return html;
};

const HOST_ID = 'host_id';

//-------------------------------------
// __image_preview
//-------------------------------------

class __image_preview extends LetcBlank {
  constructor(...args) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { return this; }).toString();
      let thisName = thisFn.match(/return (?:_assertThisInitialized\()*(\w+)\)*;/)[1];
      eval(`${thisName} = this;`);
    }
    this.onDomRefresh = this.onDomRefresh.bind(this);
    super(...args);
  }

  static initClass() {
    this.prototype.className  = "image-preview";
  }

// ===========================================================
//
// ===========================================================
  initialize(opt) {
    super.initialize();
    return this.model.atLeast({
      format  : _a.vignette});
  }


// ===========================================================
//
// ===========================================================
  onDomRefresh() {
    switch (this.mget(_a.type)) {
      case 'replace': 
        return this.el.innerHTML = require('./template/forbiden');
      default:
        return this.el.innerHTML = require('./template/forbiden');
    }
  }
}
__image_preview.initClass();
      


module.exports = __image_preview;    
