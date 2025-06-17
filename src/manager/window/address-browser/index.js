const __window = require('..');
const { customerTab, missionTab, billTab, quoteTab, noteTab } = require("./skeleton/widget")
const { placeholder } = require("../../widget/skeleton")

const { loadCustomerWindow } = require("../../utils")

class __window_address_browser extends __window {
  constructor(...args) {
    super(...args);
    this.loadCustomerWindow = loadCustomerWindow.bind(this);
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
    this.debug("AAA:60", this)
    this.loadContextBar();
  }


  /**
   * 
   */
  loadCustomersList() {
    const api = {
      service: PLUGINS.customer.list,
      args: {
        sort_by: _a.ctime,
        addressId: this.mget('addressId'),
        order: "desc"
      }
    }

    const itemsOpt = {
      kind: 'customer_item',
      flow: _a.x,
      service: "load-customer-window",
      role: '',
      logicalParent: this,
      uiHandler: [this],
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucun client à cette adresse", "Créer un client"],
        service: "add-customer"
      }))
    })
  }

  /**
   * 
   */
  loadMissionsList() {
    const api = {
      service: PLUGINS.work.list,
      args: {
        sort_by: _a.ctime,
        addressId: this.mget('addressId'),
        order: "desc"
      }
    }

    const itemsOpt = {
      kind: 'mission_item',
      flow: _a.x,
      service: "load-mission-window",
      role: '',
      logicalParent: this,
      uiHandler: [this],
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucune mission à cette adresse"]
      }))
    })
  }

  /**
   * 
   */
  loadBillsList() {
    const api = {
      service: PLUGINS.bill.list,
      args: {
        sort_by: _a.ctime,
        addressId: this.mget('addressId'),
        order: "desc"
      }
    }

    const itemsOpt = {
      kind: 'bill_item',
      flow: _a.x,
      service: "load-mission-window",
      role: '',
      logicalParent: this,
      uiHandler: [this],
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucune facture à cette adresse"]
      }))
    })
  }

  /**
   * 
   */
  loadQuotesList() {
    const api = {
      service: PLUGINS.quote.list,
      args: {
        sort_by: _a.ctime,
        addressId: this.mget('addressId'),
        order: "desc"
      }
    }

    const itemsOpt = {
      kind: 'quote_item',
      flow: _a.x,
      service: "load-mission-window",
      role: '',
      logicalParent: this,
      uiHandler: [this],
    }

    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucun devis à cette adresse"]
      }))
    })
  }

  /**
   * 
   */
  loadNotesList() {
    const api = {
      service: PLUGINS.note.list,
      args: {
        sort_by: _a.ctime,
        addressId: this.mget('addressId'),
        order: "desc"
      }
    }

    const itemsOpt = {
      kind: 'note_item',
      flow: _a.x,
      service: "load-mission-window",
      role: '',
      logicalParent: this,
      uiHandler: [this],
    }

    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this, {
        labels: ["Aucun devis à cette adresse"]
      }))
    })
  }


  /**
  * 
  */
  async loadContextBar(cmd) {
    let context = await this.ensurePart("context-bar");
    let name = "customer";
    if (cmd) {
      name = cmd.mget(_a.name);
    }
    let format = "normal";
    let salesbox;
    this._currentTab = name;
    switch (name) {
      case "customer":
        context.feed(customerTab(this));
        this.loadCustomersList(this);
        break;
      case "mission":
        context.feed(missionTab(this));
        this.loadMissionsList(this);
        break;
      case "bill":
        format = "auto";
        context.feed(billTab(this));
        this.loadBillsList(this);
        break;
      case "quote":
        context.feed(quoteTab(this));
        this.loadQuotesList(this);
        break;
      case "note":
        context.feed(noteTab(this));
        this.loadNotesList(this);
        break;
    }
    // this.ensurePart('context-bar').then((p) => {
    //   p.el.dataset.format = format;
    // })
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
      case 'load-customer-window':
        this.loadCustomerWindow(cmd)
        return
      case "load-mission-window":
        this.loadMissionWindow(cmd)
        break
      case 'load-context':
        this.loadContextBar(cmd, args);
        break;
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

__window_address_browser.initClass();

module.exports = __window_address_browser;

