// ==================================================================== *
//   Copyright Xialia.com  2011-2021
//   FILE : src/drumee/builtins/desk/media/icon
//   TYPE : 
// ==================================================================== *

const __thumbnail = require('..');
class __thumbnail_grid extends __thumbnail {
  constructor(...args) {
    super(...args);
    this.enablePreview = this.enablePreview.bind(this);
    this.initBounds = this.initBounds.bind(this);
    this.setupInteract = this.setupInteract.bind(this);
    this.allowedAction = this.allowedAction.bind(this);
    this.shift = this.shift.bind(this);
    this.resetMotion = this.resetMotion.bind(this);
    this._onStartShifting = this._onStartShifting.bind(this);
    this._onStopShifting = this._onStopShifting.bind(this);
  }

  /**
   * 
   * @param {*} opt 
   */
  initialize(opt) {
    require('./skin');
    super.initialize(opt);    
    this.type = opt.type || _a.media;
    this.isGrid   = 1;
    this.model.atLeast({
      aspect   : _a.grid,
    });
    this.innerContent = require('./template');
    this.cursorPosition = { left: 30, top: 30 };
    this.size = {
      width:90.5, 
      height:75.5
    }
  }

  /**
   * 
   */
  rowsCount(value){
    let l = 1;
    if(value && value.length){
      l = Math.ceil((value.length + 1)/11);
    }else{
     l = Math.ceil((this.mget(_a.filename).length+1)/11);
    }
    if(l>5) l = 5;
    return l;
  }


  /**
   * 
   * @param {*} toggle 
   */
  enablePreview(toggle) {
    this.$preview = this.$el.find(`#${this._id}-preview`);
    this.iconType = _a.vector;
    this.trigger('media:loaded');
    this.content.el.dataset.icontype = this.iconType; 
  }



  /**
   * 
   * @param {*} e 
   * @param {*} ui 
   */
  _dragging(e, ui){
    if (!this.allowedAction()) {
      return;
    }
    this.selected = {};
    if (this.disabled) {
      return;
    }
    //this.debug("AAA:188", ui.helper.width()*0.7, ui.helper.height()*0.7);
    this.rectangle = new Rectangle(
      ui.offset.left, ui.offset.top, ui.helper.width()*0.7, ui.helper.height()*0.7
    );
    this.selfOverlapped = this.bbox.intersection(this.rectangle);
    Wm.capture(this);
  }

  /**
   * 
   * @param {*} side 
   */
  shift(side) {
    let x;
    if (this._animIsActive) {
      return;
    }
    switch (side) {
      case _a.left:
        x = -15;
        break;

      case _a.right:
        x = 15;
        break;

      default:
        x = 0;
    }
    this._shiftX = x; 
    TweenLite.to(this.$el, .2, {
      x,
      onStart: this._onStartShifting,
      onComplete: this._onStopShifting
    });
    return this;
  }

  /**
   * 
   */
  resetMotion() {
    this.el.dataset.over = _a.off;
    this.el.dataset.hover = _a.off;
    this.shift();
  }

  /**
   * 
   * @param {*} e 
   */
  _onStartShifting(e) {
    //TweenLite.set(@_items.$el, {y:0})
    this._animIsActive = true;
  }

  /**
   * 
   * @param {*} e 
   */
  _onStopShifting(e) {
    //TweenLite.set(@_items.$el, {y:0})
    this._animIsActive = false;
    this.initBounds();
  }

 

}


module.exports = __thumbnail_grid;    
