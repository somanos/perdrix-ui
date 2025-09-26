
const Form = require('../../form');
const { BLIND_CHARS } = require("../../../utils/constants")
const { address, placeholder } = require("../../skeleton")
class __form_quote extends Form {


  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this._data = {}
    this._timer = {}
  }

  /**
   * 
   */
  onPartReady(child, pn) {
    this.raise();
    switch (pn) {
      case "topbar":
        this.setupInteract();
        break;
      case "wrapper-dialog":
        this._dialogPos = child.$el.offset()
        break;
    }
  }

  /**
   * 
   */
  _upload(e) {
    this.debug("AAA:54", e)
  }

  /**
   * 
   */
  fileDragEnter(e) {
    this.debug("AAA:61", e)
  }

  /**
   * 
   */
  fileDragOver(e) {
    this.debug("AAA:68", e)
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
      customer,
      geometry,
      siteId,
      location,
      postcode,
      site,
      work,
      workId
    } = this.model.toJSON();

    return {
      city,
      citycode,
      countrycode,
      custId: custId || customer?.custId,
      geometry,
      location,
      postcode,
      workId: workId || work?.id,
      siteId: siteId || site?.id,
      addressId: site?.addressId,
      ...this.getData()
    }
  }


  /**
   * 
   */
  onDomRefresh() {
    if (this.mget(_a.id)) {
      this.fetchService(SERVICE.quote.read, { id: this.mget(_a.id) }).then((data) => {
        this.mset(data)
        this.feed(require('./skeleton')(this));
      }).catch((e) => {
        this.feed(require('./skeleton')(this));
        this.debug("AAA:377 FAILED", e)
      })
      return
    }
    this.changeDataset("buttons", _a.state, 0)
    if (!this.mget('custId')) {
      this.model.atLeast({ site: {}, costomer: {}, work: {} })
      this.exnihilo = 1;
      this.feed(require('./skeleton/reuse')(this));
      return
    }
    if (this.mget(_a.mode) == _e.duplicate) {
      this.model.unset(_a.id)
      this.feed(require('./skeleton/reuse')(this));
      return
    }
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   * @returns 
   */
  async _checkSanity() {
    let args = this.data()
    let { custId, siteId, workId } = args;
    if (!custId) {
      Butler.say("Il n'y pas encore de client attaché à ce projet de devis")
      return 0
    }
    if (!siteId) {
      let { city, streetname } = args;
      if (!city || !streetname) {
        Butler.say("Il n'y pas encore de chantier attaché à ce projet de devis")
        return 0
      }
      let site = await this.postService(PLUGINS.site.create, { args })
      if (!site || !site.siteId) return 0
      this.mset({ site })
      let { siteId, addressId } = this.data();
      if (!addressId || !siteId) {
        Butler.say(LOCALE.ERROR_SERVER)
        return 0
      }
    }

    if (!workId) {
      let { addressId, siteId } = this.data();
      args.addressId = addressId;
      args.siteId = siteId
      let work = await this.postService(PLUGINS.work.create, { args })
      if (!work || !work.workId) return 0
      this.mset({ work })
    }
    return 1
  }

  /**
   * 
   * @returns 
   */
  async createQuote() {
    let sane = await this._checkSanity();
    if (!sane) return;
    let args = this.data();
    let { custId, siteId, workId, site, addressId } = this.data();

    if (site) addressId = site.addressId;
    if (args.tva) args.tva = args.tva / 100;
    args.custId = custId;
    args.workId = workId;
    args.siteId = siteId;
    args.addressId = addressId;

    this.changeDataset("buttons", _a.state, 0)
    this.postService("quote.create", { args }).then((data) => {
      if (this.exnihilo) {
        this.mset(data);
        let { nid, hub_id, filepath, filename, privilege } = data;
        this.viewDoc({ nid, hub_id, filepath, filename, privilege });
        setTimeout(() => { this.goodbye() }, 1000)
        return
      }
      let service = this.mget("callbackService") || 'quote-created'
      this.triggerHandlers({ service, data });
      this.goodbye()
    }).catch((e) => {
      this.__wrapperDialog.feed(acknowledge(this, {
        message: LOCALE.ERROR_SERVER,
        failed: 1,
        service: 'close-dialog',
      }))
      this.changeDataset("buttons", _a.state, 1)
      this.debug("AAA:377 FAILED", e)
    })
  }


  /**
   * 
   * @returns 
   */
  updateQuote() {
    let args = this.getData();
    let { custId, siteId, workId, id } = this.model.toJSON();
    let fields = [
      'siteId', 'custId', 'workId', _a.description
    ];

    for (let name of fields) {
      args[name] = args[name] || this.mget(name) || this.work.mget(name);
    }

    if (args.tva) args.tva = args.tva / 100;
    args.custId = custId;
    args.workId = workId;
    args.siteId = siteId;
    args.id = id;
    this.changeDataset("btn-create", _a.state, 0)
    this.postService(SERVICE.quote.update, { args }).then((data) => {
      let service = 'quote-updated'
      this.triggerHandlers({ service, data });
      this.goodbye()
    }).catch((e) => {
      this.__wrapperDialog.feed(acknowledge(this, {
        message: LOCALE.ERROR_SERVER,
        failed: 1,
        service: 'close-dialog',
      }))
      this.changeDataset("btn-create", _a.state, 1)
      this.debug("AAA:377 FAILED", e)
    })
  }

  /**
   * 
   * @param {*} cmd 
   * @param {*} extended 
   */
  async selectAddress(cmd) {
    this.ensurePart("entries-manual").then(async (p) => {
      p.el.dataset.state = "0"
      this.clearList()
    })
    const {
      street, city, housenumber, postcode, label
    } = cmd.mget('properties') || {};
    this.model.unset('addressId');
    this.model.unset('site');
    this.model.unset('siteId');
    this.mset({
      street, city, housenumber, postcode, label
    })
    let addr = await this.ensurePart("entry-address");
    addr.setValue(label)
    let p = await this.ensurePart("address-form");
    p.feed(address(this, {
      street, city, housenumber,
      postcode
    }));
    let { custId, siteId, addressId } = this.data();
    if (custId && (siteId || addressId || city)) {
      this.changeDataset("buttons", _a.state, 1)
    }
  }

  /**
   * 
   * @param {*} cmd 
   * @param {*} extended 
   */
  async selectCustomer(cmd) {
    this.mset({
      custName: cmd.mget('custName'),
      custId: cmd.mget('custId')
    })
    this.ensurePart("entries-manual").then(async (p) => {
      p.el.dataset.state = "0"
      this.clearList()
    })
    let target = await this.ensurePart("entry-custName");
    target.setValue(cmd.mget('custName'))
    let { custId, siteId, addressId, city } = this.data();
    if (custId && (siteId || addressId || city)) {
      this.changeDataset("buttons", _a.state, 1)
    }
  }

  /**
   * 
   */
  searchAddress(cmd) {
    let name;
    if (cmd) {
      name = cmd.mget(_a.name);
      if (BLIND_CHARS.includes(cmd.status)) return;
    }
    if (!name) return;
    let api = {
      service: PLUGINS.pdx_utils.search_location,
      filter: [
        {
          name: _a.ctime,
          value: "desc",
        },
        {
          name: "streetname",
          value: "asc",
        },
      ],
    }
    if (cmd.getValue) {
      api.words = cmd.getValue();
    }
    let itemsOpt = {
      kind: 'location_item',
      service: "select-address",
      logicalParent: this,
      showMap: 0,
      editable: 0,
      uiHandler: [this],
    }
    this.ensurePart(_a.list).then((list) => {
      list.mset({ api, itemsOpt });
      this.ensurePart("entries-manual").then(async (p) => {
        let pn = cmd.mget(_a.sys_pn);
        let input = await this.ensurePart(pn)
        p.el.dataset.state = "1"
        p.el.style.top = "56px";
      })
      list.restart();
    })
  }

  /**
   * 
   */
  searchCustomer(cmd) {
    if (this.isBlindChar(cmd)) return;
    let name = cmd.mget(_a.name);
    if (!name) return;
    let api = {
      service: PLUGINS.customer.list,
      args: {
        sort_by: _a.ctime,
        order: "desc",
      }
    }
    if (cmd.getValue) {
      api.args.custName = cmd.getValue();
    }
    let itemsOpt = {
      kind: 'customer_item',
      service: "select-cutomer",
      logicalParent: this,
      editable: 0,
      uiHandler: [this],
    }
    this.ensurePart(_a.list).then((list) => {
      list.mset({ api, itemsOpt });
      this.ensurePart("entries-manual").then(async (p) => {
        let pn = cmd.mget(_a.sys_pn);
        let input = await this.ensurePart(pn)
        p.el.dataset.state = "1"
        p.$el.width(input.$el.width())
        p.el.style.top = "25px";
      })
      this.feedList(api, itemsOpt, (list) => {
        //list.model.unset(_a.itemsOpt)
        list.feed(placeholder(this, { labels: ["Aucun client trouvé.", "Créer d'abord un client"], service: "create-customer" }));
      })
    })
  }

  /**
   * 
   */
  updateAmount() {
    let data = this.getData()
    let ht = parseFloat(data.ht) || 0;
    let tva = parseFloat(data.tva) || 0;
    let discount = parseFloat(data.discount) || 0;
    let ttc = (ht + ht / 100 * tva - discount).toFixed(2);
    if (ttc != null) {
      this.ensurePart('ttc').then((p) => {
        p.setValue(ttc.toString())
      })
    }
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    // this.debug("AAA:135", service, cmd, args, this)
    switch (service) {
      case _a.create:
        this.createQuote(cmd);
        break;
      case _e.update:
        this.updateQuote(cmd);
        break;
      case _a.input:
        this.updateAmount();
        break;
      case "search-address":
        this.searchAddress(cmd);
        break;
      case "select-address":
        this.selectAddress(cmd);
        break;
      case "customer-created":
      case "select-cutomer":
        this.selectCustomer(cmd);
        break;
      case "search-customer":
        this.searchCustomer(cmd);
        break;
      case "create-customer":
        this.loadWidget({ kind: "form_customer", uiHandler: [this], callbackService: "customer-created", });
        break
      case "show-doc":
        let { nid, hub_id, filepath, filename, privilege } = this.model.toJSON()
        this.viewDoc({ nid, hub_id, filepath, filename, privilege });
        break
      case "reset-address":
        this._args = {}
        this.model.unset('addressId');
        this.model.unset('siteId');
        this.changeDataset("btn-create", _a.state, 0)
        this.changeDataset("address-form", _a.state, _a.closed)
        this.changeDataset("entries-manual", _a.state, _a.closed)
        this.resetEntries("entry-address");
        break
      case "reset-customer":
        this._args = {}
        this.changeDataset("entries-manual", _a.state, _a.closed)
        this.changeDataset("btn-create", _a.state, 0)
        this.model.unset('custId');
        this.resetEntries("entry-custName");
        // this.updateAmount();
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

__form_quote.initClass();

module.exports = __form_quote
