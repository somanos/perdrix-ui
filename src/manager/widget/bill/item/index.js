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
    this.mset({ billId: opt.id })
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
  async viewBill() {
    let bill = this.mget('bill');
    let Media = await Kind.waitFor('media_pseudo');
    let media = new Media(bill);
    let args = { kind: "document_reader", media }
    this.debug("AAA:69", args)
    this.loadWidget(args)
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


  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.mget(_a.service);
    this.debug("AAA:27", service, this, cmd)
    switch (service) {
      case 'view-bill':
        this.viewBill()
        break;
      case 'add-bill':
        this.promptBill()
        break;
      default:
        this.triggerHandlers({
          service,
        })
    }
  }

}

module.exports = __bill_item