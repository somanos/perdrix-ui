/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// ==================================================================== *
//   Copyright Xialia.com  2011-2021
//   FILE : /src/drumee/modules/desk/wm/dock/skeleton/launcher.coffee
//   TYPE : Skeleton
// ==================================================================== *

// ==================================================================== *
//
// ==================================================================== *
const __tooltips = function(_ui_,c ){
  let a;
  const pfx = _ui_.fig.family;
  return a = { 
    className : `${pfx}__tooltips ${pfx}-tooltips`,
    content : c
  };
};

// ==================================================================== *
//
// ==================================================================== *
const __dock_widget_mobile_launchers = function(_ui_) {
  let menu;
  let profileType = 'pro';
  if (Visitor.isHubUser()) {
    profileType = _a.hub;
  }

  const button_class = `${_ui_.fig.family}__button launcher ${profileType}`;
  const pfx = _ui_.fig.family; 
  const menuFig = `${_ui_.fig.family}`;

  const mobileLauncherTrigger =  Skeletons.Button.Svg({
    ico       : 'lines',
    className : `${button_class} mobile-launcher tbd ${profileType}`
  });
    // tooltips  : __tooltips(_ui_,  "#{LOCALE.SYNC_AGENDA} #{LOCALE.NOT_YET_IMPLEMENTED}")#"Calendar #{LOCALE.NOT_YET_IMPLEMENTED}")
    // service   : 'tbd'
  
  const bigChatNotifier = {
    kind      : 'bigchat_widget_notification',
    className : `${_ui_.fig.family}__bigchat-notifier`,
    label     : 'Chat Notification',
    service   : 'bigchat',
    type      : 'bigchat',
    route     : {
      page      :'notification'
    },
    uiHanlder : _ui_
  };

  const mobileLauncherItems = Skeletons.Box.X({
    className   : `${menuFig}__docker-menu ${profileType}`,
    sys_pn      : "dock-minifier-panel",
    kids        : [
      require('./maker')(_ui_),
      require('./launcher')(_ui_)
    ]});
  
  const a = Skeletons.Box.X({
    debug     : __filename,
    className   : `${pfx}__container mobile-launcher ${profileType}`,
    kids: [
      (menu = { 
        kind      : _t.menu.topic,
        className : `${menuFig}__mobile-launch-wrapper ${_ui_.fig.group}__mobile-launch-wrapper ${profileType}`,
        part      : _ui_, 
        debug     : __filename, 
        direction : _a.up,
        sys_pn    : "dock-minifier-menu",
        opening   : _e.flyover,
        persistance: _a.always,
        trigger   : mobileLauncherTrigger,
        items     : mobileLauncherItems,
        service   : "go-to",
        uiHandler : _ui_
      }) 
      
      // Skeletons.Box.X
      //   className  : "#{_ui_.fig.family}__addressbook"
      //   kids       : [
      //     bigChatNotifier
      //     Skeletons.Button.Svg
      //       ico       : 'drumee-chat-visio'
      //       className : "#{button_class} conference"
      //       tooltips  : __tooltips(_ui_, LOCALE.CHAT_VIDEO)
      //       respawn   : 'window_bigchat'
      //       service   : _e.launch
      //   ]
    ]});
  
  return a;
};

module.exports = __dock_widget_mobile_launchers;
