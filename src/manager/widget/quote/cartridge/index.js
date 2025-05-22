const {
  loadWidget, updateAmount
} = require("../../../utils")

class __quote_cartridge extends LetcBox {
  constructor(...args) {
    super(...args);
    this.loadWidget = loadWidget.bind(this);
    this.updateAmount = updateAmount.bind(this);
  }

  /**
   * Initialize the widget
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.mset({ quoteId: opt.id })
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
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.mget(_a.service);
    this.debug("AAA:27", service, this, cmd)
    switch (service) {
      case _a.input:
        this.updateAmount();
        break;
      case "show-doc":
        this.triggerHandlers({
          service,
        })
        break;
      default:
    }
  }

}

module.exports = __quote_cartridge