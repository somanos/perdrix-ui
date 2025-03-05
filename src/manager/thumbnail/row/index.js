
// ==================================================================== *
//   Copyright Xialia.com  2011-2019
//   FILE : src/drumee/builtins/desk/media/row
//   TYPE : 
// ==================================================================== *
//const media_interact = require('../interact');
const MEDIA_TOGGLE = "madia-toggle";

//-------------------------------------
// __media_row
//-------------------------------------
class __media_row extends DrumeeMediaInteract {
  constructor(...args) {
    super(...args);
    this.enablePreview = this.enablePreview.bind(this);
    //this.loadVector = this.loadVector.bind(this);
    this.initBounds = this.initBounds.bind(this);
    //this.ghostIcon = this.ghostIcon.bind(this);
    // this._dragStop = this._dragStop.bind(this);
    this.shift = this.shift.bind(this);
    this.resetMotion = this.resetMotion.bind(this);
    this._onStartShifting = this._onStartShifting.bind(this);
    this._onStopShifting = this._onStopShifting.bind(this);
  }

  static initClass() {
    this.prototype.isRow = 1;
    this.prototype.behaviorSet = {
      bhv_radio:1
    };
  }

  // ===========================================================
  //
  // ===========================================================
  initialize(opt) {
    require('./skin');
    super.initialize(opt);
    this.mset({
      flow: _a.x,
      radio : MEDIA_TOGGLE
    });
    this.innerContent = require('./template');
    this.cursorPosition = { left: 35, top: 35 };
    this.size = {
      width: 500,
      height: 32
    }
  }

  /**
 * 
 */
   rowsCount(value) {
    return 1;
  }

  /**
   * 
   * @param {*} toggle 
   */
  enablePreview(toggle) {
    if(Visitor.inDmz){
      this.$el.addClass(_a.dmz)
    }
    switch (this.model.get(_a.filetype)) {
      case _a.image: case _a.video: case _a.vector:
        this.iconType = _a.vignette;
        var f = () => {
          this.$preview = $(`#${this._id}-preview`);
          this.$preview.css({
            'background-image': `url(${this.mget(_a.url)})`,
            'background-size': "cover",
            'background-repeat': "no-repeat",
            'background-position': _K.position.center
          });
        };
        Utils.waitForEl(`${this._id}-preview`, f);
        break;
      // case _a.vector:
      //   this.iconType = _a.vignette;
      //   var f = () => {
      //     this.$preview = $(`#${this._id}-preview`);
      //     this.$preview.css({
      //       'background-image': `url(${this.mget(_a.url)})`,
      //       'background-size': "contain",
      //       'background-repeat': "no-repeat",
      //       'background-position': _K.position.center
      //     });
      //   };
      //   Utils.waitForEl(`${this._id}-preview`, f);
      //   break;


      default:
        this.iconType = _a.vector;
    }
    this.content.el.dataset.icontype = this.iconType;
  }




  // ===========================================================
  // shift
  // ===========================================================
  shift(side) {
    let y;
    if (this._animIsActive) {
      return;
    }
    switch (side) {
      case _a.left: case _a.top:
        y = -2;
        this.el.dataset.shift = _a.top;
        break;

      case _a.right: case _a.bottom:
        y = 2;
        this.el.dataset.shift = _a.bottom;
        break;

      default:
        this.el.dataset.shift = _a.none;
        y = 0;
    }
    this._shiftY = y;
    // TweenLite.to(this.$el, .2, {
    //   y,
    //   onStart    : this._onStartShifting,
    //   onComplete : this._onStopShifting
    // });
  }

  // ===========================================================
  // shift
  // ===========================================================
  resetMotion() {
    this.el.dataset.over = _a.off;
    this.el.dataset.hover = _a.off;
    this.el.dataset.shift = _a.off;
    this.shift();
  }

  // ===========================================================
  //
  // ===========================================================
  _onStartShifting(e) {
    this._animIsActive = true;
  }

  // ===========================================================
  //
  // ===========================================================
  _onStopShifting(e) {
    this._animIsActive = false;
  }
}
__media_row.initClass();





module.exports = __media_row;
