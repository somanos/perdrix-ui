
class __mission_list extends LetcBox {

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();

  }


  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.debug("AAA:19", this)
    this.feed(require('./skeleton')(this));
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(trigger, args = {}) {
    const service = this.mget(_a.service) || "open-viewer";
    this.triggerHandlers({
      service,
    })
  }

}

module.exports = __mission_list