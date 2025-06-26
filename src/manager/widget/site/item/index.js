
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
    let {
      city,
      citycode,
      countrycode,
      custId,
      addressId,
      geometry,
      id,
      siteId,
      location,
      postcode,
      customer,
    } = this.model.toJSON();

    if (!custId) {
      custId = customer.id;
    }
    return {
      city,
      id,
      citycode,
      countrycode,
      custId,
      addressId,
      geometry,
      location,
      postcode,
      siteId,
      customer,
      type: 'site'
    }
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    try {
      this.feed(require('./skeleton')(this));
    } catch (e) {
      this.warn(e, this)
    }
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(trigger, args = {}) {
    const service = this.mget(_a.service) || "open-viewer";
    this.debug("AAA:63", this, service, trigger.mget(_a.service))
    this.triggerHandlers({
      service,
    })
  }


}

module.exports = __site_item