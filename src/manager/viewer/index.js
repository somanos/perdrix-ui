/* ==================================================================== *
*   Copyright Xialia.com  2011-2023
*   FILE : /src/drumee/builtins/player/schedule/index.js
*   TYPE : Component
* ==================================================================== */

//#########################################

class __viewer_core extends DrumeeInteractWindow {
  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
  }

  static initClass() {
    this.prototype.behaviorSet = {
      bhv_radio: 1,
    };
  }

  onPartReady(child, pn) {
    //this.debug("AAA:26", child, pn);
    this.raise();
    switch (pn) {
      case _a.content:
        if(this.display){
          this.display();
        }
        break;

      case "topbar":
        this.setupInteract();
        break;
    }
  }

}
__viewer_core.initClass();
module.exports = __viewer_core
