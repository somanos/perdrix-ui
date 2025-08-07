const {
  loadWidget
} = require("../../../utils")

class __mission_item extends LetcBox {
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
    this.mset({ workId: opt.id })
    this.checkChanges = this.checkChanges.bind(this);
  }

  /**
  * 
  */
  data() {
    const {
      custId,
      customer,
      addressId,
      siteId,
      workId,
      description,
      site,
      status,
      workType,
      type
    } = this.model.toJSON();

    return {
      custId: custId || customer.custId,
      customer,
      addressId: addressId || site.addresId,
      siteId,
      workId,
      description,
      site,
      status,
      id: workId,
      workType,
      type
    }
  }

  /**
   * 
   */
  onBeforeDestroy() {
    this.el.onmouseleave = null;
  }

  /**
   * 
   */
  async checkChanges() {
    let { description } = this.getData();
    if (this._description === description) {
      return
    }
    this._description = description;
    let { id } = this.data()
    this.postService(PLUGINS.work.update, { args: { description, id } })
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
    this.el.onmouseleave = this.checkChanges
  }

  /**
   * 
   */
  async viewQuotes() {
    let args = {
      workId: this.mget('workId'),
    }
    this.postService(PLUGINS.work.quotes, args).then(async (data) => {
      let Media = await Kind.waitFor('media_pseudo');
      for (let item of data) {
        if (!item.filepath) continue;
        let media = new Media(item);
        let args = { kind: "document_reader", media }
        this.loadWidget(args)
      }
    })
  }

  /**
   * 
   */
  async viewBills() {
    let args = {
      workId: this.mget('workId'),
    }
    this.postService(PLUGINS.work.bills, args).then(async (data) => {
      let Media = await Kind.waitFor('media_pseudo');
      for (let item of data) {
        if (!item.filepath) continue;
        let media = new Media(item);
        let args = { kind: "document_reader", media }
        this.loadWidget(args)
      }
    })
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.mget(_a.service);
    this.debug("AAA:114", service, this, cmd)
    switch (service) {
      case 'view-quotes':
        this.viewQuotes()
        break;
      case 'view-bills':
        this.viewBills()
        break;
      case "update-mission":
        this.checkChanges();
        break;
      case _e.input:
      case _a.interactive:

        break;
      default:
        this.triggerHandlers({
          service: this.mget(_a.service),
        })
    }
  }

}

module.exports = __mission_item