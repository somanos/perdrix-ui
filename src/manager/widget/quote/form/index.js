
const Form = require('../../form');

class __form_quote extends Form {


  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.model.atLeast({
      type: 'work',
      category: 0
    })
    this._data = {}
    this._timer = {}
    this.mset(opt.source.data())
    this.work = opt.work;
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
      type: 'work'
    }
  }

  /**
   * 
   */
  onPartReady(child, pn) {
    switch (pn) {
      case "site-address":
        let work = this.mget('work');
        let site;
        if (work) {
          site = work.mget('site');
          if (!site) return;
          this.debug("AAA:72", { work, site })
          child.feed({
            ...site,
            type: 'site',
            kind: 'location_view',
            state: 1
          })
        }
        break;
      default:
        super.onPartReady(child, pn)
        break;
    }
  }

  /**
   * 
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   * @returns 
   */
  createQuote() {
    let args = this.getData();
    let fields = [
      'siteId', 'custId', 'workId', _a.description
    ];

    for (let name of fields) {
      args[name] = args[name] || this.mget(name) || this.work.mget(name);
    }

    if (args.tva) args.tva = args.tva / 100;
    args.workId = this.work.mget(_a.id);
    args.siteId = this.work.mget('siteId');
    this.debug("AAA:323", args, this);
    this.changeDataset("btn-create", _a.state, 0)
    this.postService("quote.create", { args }).then((data) => {
      this.triggerHandlers({ data, service: "quote-created" })
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
      case "prompt-location":
        this.promptSite(cmd);
        break;
      case "select-site":
        let { choice } = cmd.getData();
        this.debug("AAA:238", choice, service, cmd)
        switch (choice) {
          case "same-address":
            this.selectSite(this)
            break;
          case "list-sites":
            this.loadSitesList(cmd)
            break;
          case "add-site":
            this.promptSite(cmd);
            break;
        }
        break;
      case _a.input:
        let { name } = cmd.getData();
        this.debug("AAA:238", name, service, cmd)
        this.updateAmount();
        break;
      case "site-created":
        this.loadSitesList(cmd);
        setTimeout(() => {
          this.raise();
        }, 1000)
        break;
      case "set-site":
        this.mset({ siteId: cmd.mget(_a.id), siteType: 'site' })
        this.selectSite(cmd);
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

__form_quote.initClass();

module.exports = __form_quote
