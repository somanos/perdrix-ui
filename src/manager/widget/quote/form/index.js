
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
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   * @returns 
   */
  createQuote() {
    let args = this.getData();
    let error = 0;
    let fields = [
      'siteId', 'custId', 'workId', _a.description
    ];

    for (let name of fields) {
      args[name] = args[name] || this.mget(name) || this.work.mget(name);
    }
    this.debug("AAA:323", args, this);
    this.postService("quote.create", { args }).then((data) => {
      this.triggerHandlers({ service: 'quote-created', data })
    }).catch((e) => {
      this.__wrapperDialog.feed(acknowledge(this, {
        message: LOCALE.ERROR_SERVER,
        failed: 1,
        service: 'close-dialog',
      }))
      this.debug("AAA:377 FAILED", e)
    })
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:213", service, cmd, this)
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
