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
      service: "poc.sites",
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
    * 
    */
  async promptPoc(cmd) {
    let {
      siteId, custId, pocId, phones, email, customer, role, gender, firstname, lastname
    } = this.model.toJSON();
    this.loadWidget({
      kind: 'form_poc',
      customer,
      id: `poc-form-${this.mget(_a.id)}`,
      uiHandler: [this],
      pocId,
      custId,
      siteId,
      phones,
      role,
      gender,
      email,
      firstname,
      lastname,
      service: "poc-created"
    })
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
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
          kind: 'form_site',
          source: this,
          id: `site-form-${this.mget('custId')}`,
          uiHandler: [this],
          service: "site-created"
        })
        break;
      case _a.change:
        this.promptPoc()
        break;
      default:
        this.triggerHandlers({
          service,
        })
    }
  }


}

module.exports = __poc_item