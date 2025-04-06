
class __work_item extends LetcBox {

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.mset({ workId: opt.id })
  }

  /**
  * 
  */
  data() {
    const {
      custId,
      siteId,
      workId,
      description,
      site,
      status,
    } = this.model.toJSON();

    return {
      custId,
      siteId,
      workId,
      description,
      site,
      status,
    }
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.mget(_a.service);
    this.debug("AAA:27", service, this, cmd)
    this.triggerHandlers({
      service,
    })
  }

}

module.exports = __work_item