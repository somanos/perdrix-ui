const {
  loadWidget
} = require("../../../utils")

class __bill_item extends LetcBox {
  constructor(...args) {
    super(...args);
    this.loadWidget = loadWidget.bind(this);
  }

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
  }

  /**
  * 
  */
  data() {
    const {
      custId,
      siteId,
      billId,
      description,
      site,
      status,
      workId,
      workType,
    } = this.model.toJSON();
    let {
      city,
      citycode,
      countrycode,
      geometry,
      location,
      postcode,
    } = this.mget('site') || {};

    return {
      custId,
      siteId,
      billId,
      description,
      site,
      status,
      workId,
      workType,
      city,
      citycode,
      countrycode,
      geometry,
      location,
      postcode,
    }
  }

  /**
   * 
   */
  restart(data) {
    if (data) {
      this.mset(data);
    }
    this.feed(require('./skeleton')(this));
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.restart()
  }


  /**
   * 
   */
  async promptBill() {
    this.loadWidget({
      kind: 'form_bill',
      source: this,
      id: `bill-form-${this.mget('custId')}`,
      uiHandler: [this],
      service: "bill-created"
    })
  }

  onUiEvent(trigger, args = {}) {
    const service = trigger.mget(_a.service) || "open-viewer";
    this.triggerHandlers({
      service,
    })
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  // onUiEvent(cmd, args = {}) {
  //   const service = args.service || cmd.mget(_a.service);
  //   this.debug("AAA:27", service, this, cmd)
  //   switch (service) {
  //     case 'add-bill':
  //       this.promptBill()
  //       break;
  //     default:
  //       this.triggerHandlers({
  //         service,
  //       })
  //   }
  // }

}

module.exports = __bill_item