const __window = require('..');
const { transferTab, quoteTab, billTab, pocTab, workTab } = require("./skeleton/widget")
const { updateBalance, loadSalesHistory, loadSalesList } = require("../../utils")

class __window_site extends __window {
  constructor(...args) {
    super(...args);
    this.updateBalance = updateBalance.bind(this);
    this.loadSalesList = loadSalesList.bind(this);
    this.loadSalesHistory = loadSalesHistory.bind(this);
  }

  /**
   * 
   * @param {*} opt 
   */
  initialize(opt) {
    require('./skin');
    super.initialize(opt);
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
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
    this.loadContextBar();
    //this.loadWorkList({ service: "mission-hitsory", format: _a.small })
  }

  /**
    * 
    */
  async promptPoc(cmd) {
    let { siteId, custId } = this.model.toJSON();
    this.loadWidget({
      kind: 'form_poc',
      customer: this.mget('customer'),
      id: `poc-form-${this.mget(_a.id)}`,
      uiHandler: [this],
      custId,
      siteId,
      service: "poc-created"
    })
  }


  /**
   * 
   */
  async loadCustomersList() {
    let list = await this.ensurePart(_a.list);
    list.model.unset(_a.itemsOpt)
    list.feed(require('./skeleton/culstomers-list')(this))
  }

  /**
   * 
   */
  async searchCustomers(cmd) {
    this.debug("AAAA:88", cmd)
    let list = await this.ensurePart('customers-list');
    let api = list.mget(_a.api)
    api.words = cmd.getValue();
    this.debug("AAAA:85", api, list)
    if (!api.words) return;
    list.mset({ api })
    list.restart()
  }

  /**
   * 
   */
  transferToCustomer(customer) {
    let custId = customer.mget('custId');
    let args = {
      id: this.mget('siteId'),
      custId
    }
    this.debug("AAA:101", args, this)
    let msg = `Voulez-vous transférer ce chantier au client 
      ${customer.mget('custName')} (n°${custId})?`;
    this.confirm(msg).then(() => {
      this.postService(PLUGINS.site.transfer, args).then((data) => {
        //this.loadCustomersList()
        Wm.alert("Transfert réussi!")
        RADIO_BROADCAST.trigger('site-transfered')
      }).catch((e) => {
        Wm.alert(LOCALE.ERROR_SERVER)
      })
    })
  }

  /**
  * 
  */
  async loadContextBar(cmd) {
    let context = await this.ensurePart("context-bar");
    let name = "work";
    if (cmd) {
      name = cmd.mget(_a.name);
    }
    let format = "normal";
    let salesbox;
    this._currentTab = name;
    switch (name) {
      case "transfer":
        context.feed(transferTab(this));
        this.loadCustomersList(cmd);
        break;
      case "quote":
        format = "auto";
        context.feed(quoteTab(this));
        salesbox = await this.ensurePart("salesbox");
        this.loadSalesHistory(cmd, {
          type: name,
          salesbox,
          custId: this.mget('custId'),
          siteId: this.mget('siteId')
        })
        break;
      case "bill":
        format = "auto";
        context.feed(billTab(this));
        salesbox = await this.ensurePart("salesbox");
        this.loadSalesHistory(cmd, {
          type: name,
          salesbox,
          custId: this.mget('custId'),
          siteId: this.mget('siteId')
        })
        break;
      case "poc":
        context.feed(pocTab(this));
        this.loadSitePocs(cmd)
        break;
      case "work":
        context.feed(workTab(this));
        this.loadWorkList(
          { service: "mission-hitsory", format: 'big' },
          await this.getSortOptions(null, ["fdate"])
        );
        break;
    }
    this.ensurePart('context-bar').then((p) => {
      p.el.dataset.format = format;
    })
  }

  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.model.get(_a.service);
    this.debug(`AAA:170 onUiEvent=${service}`, cmd, args, this);
    switch (service) {
      case "mission-hitsory":
        this.loadMissionWindow(cmd);
        break;
      case 'load-context':
        this.loadContextBar(cmd, args);
        break;
      case 'create-poc':
        this.promptPoc(cmd);
        break;
      case 'create-mission':
        this.loadMissionForm(cmd)
        break;
      case 'poc-created':
        this.loadSitePocs(cmd)
        break;
      case 'transfer':
        this.loadCustomersList(cmd)
        break;
      case _a.input:
        this.searchCustomers(cmd)
        break;
      case 'transfer-to-customer':
        this.transferToCustomer(cmd)
        break;
      case 'fiscal-year':
        let name = cmd.mget(_a.name);
        if (!name) break;
        this.loadSalesHistory(cmd, { type: this._currentTab, custId: this.mget(CUST_ID) })
      default:
        super.onUiEvent(cmd, args);
    }
  }

  /**
   * To start the Meeting 
   * @param {LetcBox}  media 
   */
  showDetails(cmd) {
    return
  }

}

__window_site.initClass();

module.exports = __window_site;

