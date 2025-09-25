
const Form = require('../../form');
const { BLIND_CHARS } = require("../../../utils/constants")
const { address } = require("../../skeleton")
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
      geometry,
      id,
      location,
      postcode,
    } = this.model.toJSON();

    return {
      city,
      citycode,
      countrycode,
      custId,
      geometry,
      location,
      postcode,
      siteId: id,
    }
  }


  /**
   * 
   */
  onDomRefresh() {
    this.debug("AAA:86", this)
    if (!this.mget('custId')) {
      Wm.launch({ ...options, kind: 'form_customer', uiHandler: [this] });
    } else {
      if (this.mget(_a.mode) == _e.duplicate) {
        this.model.unset(_a.id)
        this.feed(require('./skeleton/reuse')(this));
        return
      }
    }
    if (this.mget(_a.id)) {
      this.fetchService(SERVICE.quote.read, { id: this.mget(_a.id) }).then((data) => {
        this.debug("AAA:88", data)
        this.mset(data)
        this.feed(require('./skeleton')(this));
      }).catch((e) => {
        this.feed(require('./skeleton')(this));
        this.debug("AAA:377 FAILED", e)
      })
      return
    }
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   * @returns 
   */
  createQuote() {
    let args = this.getData();
    let { custId, siteId, workId } = this.model.toJSON();
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
    this.changeDataset("btn-create", _a.state, 0)
    this.postService("quote.create", { args }).then((data) => {
      let service = this.mget("callbackService") || 'quote-created'
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
    this.model.unset("addressId")
    this.ensurePart("entries-manual").then(async (p) => {
      p.el.dataset.state = "0"
      this.clearList()
    })
    const {
      street, city, housenumber, postcode, label
    } = cmd.mget('properties') || {};
    let addr = await this.ensurePart("address");
    addr.setValue(label)
    let p = await this.ensurePart("address-form");
    this.debug("AAA:192", addr, p, label, cmd.mget('properties'))
    p.feed(address(this, {
      street, city, housenumber,
      postcode
    }));
  }

  /**
   * 
   */
  searchAddress(cmd) {
    let name;
    if (cmd) {
      name = cmd.mget(_a.name);
      if (BLIND_CHARS.includes(cmd.status)) return;
      //order = cmd.mget(_a.state) ? "asc" : "desc";
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
    this.debug("AAA:151", api, name, api[name])
    this.ensurePart(_a.list).then((list) => {
      list.mset({ api, itemsOpt });
      this.ensurePart("entries-manual").then(async (p) => {
        let pn = cmd.mget(_a.sys_pn);
        let input = await this.ensurePart(pn)
        p.el.dataset.state = "1"
        p.$el.width(input.$el.width() - 40)
      })
      list.restart();
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
    this.debug("AAA:135", service, cmd, this)
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
      case "search-customer":
        break;
      case "reset-address":
        this.resetEntries("address");
        break
      case "reset-customer":
        this.resetEntries("custName");
        // this.updateAmount();
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

__form_quote.initClass();

module.exports = __form_quote
