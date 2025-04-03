const { feedList, clearList, loadWidget, changeDataset } = require("../../../utils")
const { placeholder } = require("../../skeleton")
class __poc_item extends LetcBox {
  constructor(...args) {
    super(...args);
    this.feedList = feedList.bind(this);
    this.clearList = clearList.bind(this);
    this.loadWidget = loadWidget.bind(this);
    this.changeDataset = changeDataset.bind(this);
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
  async loadSites(cmd) {
    let api = {
      service: "perdrix.poc_sites",
      id: this.mget(_a.id),
      custId: this.mget('custId')
    }
    let itemsOpt = {
      kind: 'site_item',
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucun chantier en cours", "Creer un chantier"],
        service: "add-site"
      }));
    })
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.debug("AAA:17", this)
    this.feed(require('./skeleton')(this));
  }
  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.model.get(_a.service);
    this.debug(`AAA:56 onUiEvent=${service}`, cmd, args, this);
    switch (service) {
      case 'show-sites':
      case "site-created":
        this.loadSites(cmd)
        break;
      case "add-site":
        this.loadWidget({
          kind: 'site_form',
          source: this,
          id: `site-form-${this.mget('custId')}`,
          uiHandler: [this],
          service: "site-created"
        })
        break;
      default:
        this.triggerHandlers({
          service,
        })
    }
  }


}

module.exports = __poc_item