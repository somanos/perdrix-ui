const __acknowledge = function(_ui_, data) {
  return Skeletons.Box.X({
    className : `${_ui_.fig.family}__acknowledge`,
    debug     : __filename, 
    kids : [
      Skeletons.Button.Svg({
        ico       : 'available',
        className : 'icon'
      }),

      Skeletons.Note({
        className : 'text',
        content   : LOCALE.ACK_COPY_LINK
      })
    ]});

};
module.exports = __acknowledge;
