// ==================================================================== *
//   Copyright Xialia.com  2011-2021
//   FILE : /src/drumee/modules/desk/wm/dock/skeleton/launcher.coffee
//   TYPE : Skeleton
// ==================================================================== *

//const helper = require('./helper');

const _helpers = function (_ui_, content, name) {
  const pfx = `${_ui_.fig.family}__helper`
  const a = Skeletons.Box.X({
    debug: __filename,
    className: `${pfx}-container`,
    service : `video-help`,
    name,
    haptic:2000,
    kidsOpt:{
      active:0
    },
    kids: [
      Skeletons.Button.Svg({
        ico: 'desktop_videofile',
        className: `${pfx}-icon`,
        innerClass:'helper',
        // service: _e.launch
      }),
      Skeletons.Note({
        className: `${pfx}-text`,
        content
      })
    ]
  });

  return a;
};

// ==================================================================== *
//
// ==================================================================== *
const __dock_button = function (_ui_, opt, label, extra) {
  const a = Skeletons.Box.X({
    debug: __filename,
    className: `${_ui_.fig.family}__action`,
    helper: _helpers(_ui_, label, opt.helperName),
    kids: [Skeletons.Button.Svg({innerClass:'action', ...opt})]
  })
  if(extra){
    a.kids.unshift(extra)
  }
  return a;
};

module.exports = __dock_button;
