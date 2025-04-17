const {
  loadWidget
} = require("../../../utils")

class __work_item extends LetcBox {
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
   * 
   */
  restart(data) {
    if (data) {
      this.mset(data);
    }
    if(this.mget(_a.format) == _a.small){
      this.feed(require('./skeleton/small')(this));
      this.$el.addClass(_a.small)
    }else{
      this.feed(require('./skeleton')(this));
    }
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
  async viewQuote() {
    let quote = this.mget('quote');
    let Media = await Kind.waitFor('media_pseudo');
    let media = new Media(quote);
    let args = { kind: "document_reader", media }
    this.loadWidget(args)
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
      case 'view-quote':
        this.viewQuote()
        //this.promptSite(cmd);
        break;
      default:
        this.triggerHandlers({
          service,
        })
    }
  }

}

module.exports = __work_item