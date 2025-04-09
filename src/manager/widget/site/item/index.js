
class __site_item extends LetcBox {

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.mset({ siteId: opt.id })
  }

  /**
  * 
  */
  data() {
    const {
      city,
      citycode,
      countrycode,
      custId,
      geometry,
      id,
      siteId,
      location,
      postcode,
    } = this.model.toJSON();

    return {
      city,
      id,
      citycode,
      countrycode,
      custId,
      geometry,
      location,
      postcode,
      siteId,
      type: 'site'
    }
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

module.exports = __site_item