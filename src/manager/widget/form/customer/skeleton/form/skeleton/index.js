
const __skl_conference_invitation = function(_ui_) {

  const pfx = _ui_.fig.family;
  
  const header = Skeletons.Box.X({
    className : `${pfx}__header ${_ui_.fig.group}__header`, 
    kids     : [Preset.Button.Close(_ui_)],
    sys_pn   : _a.header
  });

    
  const title = Skeletons.Box.X({
    className : `${pfx}__description title`,
    kids      : [
      Skeletons.Button.Svg({
        ico       : "drumee-target",
        className : `${pfx}__icon attendees`
      }),
      Skeletons.Entry({
        className    : `${pfx}__entry title`,
        name         : 'title',
        formItem     : 'title',
        innerClass   : _a.date,
        placeholder  : LOCALE.TITLE,
        preselect    : 1,
        errorHandler : [_ui_]})
    ]});

  const date = Skeletons.Box.X({
    className : `${pfx}__description date`,
    kids      : [
      Skeletons.Button.Svg({
        ico       : "backoffice_history",
        className : `${_ui_.fig.family}__icon date`
      }),
      Skeletons.Entry({
        className    : `${pfx}__entry date`,
        name         : _a.date,
        formItem     : _a.date,
        innerClass   : _a.date,
        placeholder  : LOCALE.WHEN,
        errorHandler : [_ui_]})
    ]});

  const description = Skeletons.Box.X({
    className : `${pfx}__description message`,
    kids      : [
      Skeletons.Button.Svg({
        ico       : "drumee-agenda",
        className : `${pfx}__icon message`
      }),
      Skeletons.Entry({
        className   : `${pfx}__entry message`,
        type        : _a.textarea,
        name        : _a.message,
        formItem    : _a.message,
        innerClass  : _a.message,
        placeholder : LOCALE.WHY
      })
    ]});

  const errorWrapper =  Skeletons.Wrapper.Y({
    className : `${pfx}__message-error`,
    name      : "error"
  });

  const buttons = Skeletons.Box.X({
    className : `${pfx}__buttons`,
    service   : _e.send,
    kidsOpt   : {
      active : 0
    },
    kids      : [
      Skeletons.Note(LOCALE.SEND_INVITE_EMAIL, "button")
    ]});

  const body = Skeletons.Box.Y({
    className: `${pfx}__body xxx`,
    kids:[
      Skeletons.Note({
        content : LOCALE.CREATE_BUSINESS_FILE,
        className : `${pfx}__title`
      }),

      Skeletons.Box.Y({ 
        className : `${pfx}__details`,
        kids      :[ title, date, description ]}),

      // Skeletons.Box.Y
      //   className : "#{pfx}__invitation"
      //   kids      : [ invitation, errorWrapper ]
        
      buttons
    ]});


  const a = Skeletons.Box.Y({
    debug     : __filename,
    className : `${pfx}__main`,
    kids      : [header, body]});
  
  return a;
};
  
module.exports = __skl_conference_invitation;
