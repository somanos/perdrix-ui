const ItemCore = require('../../item');

class __note_item extends ItemCore {
  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    let { custId, siteId, workId, id } = opt;
    this.mset({ parentDir: `/.attachment/${custId}/${siteId}/${workId}/${id}` })
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.debug("AAA:17", this)
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
__note_item.initClass();

module.exports = __note_item