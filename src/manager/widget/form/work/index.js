
const Form = require('..');
require('../skin');

class __form_work extends Form {


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
      case 'companyname':
      case _a.lastname:
        child.on(_e.blur, (e) => {
          this.clearList();
        })
        break;
    }
  }


  /**
    * 
    */
  // async promptSite(cmd) {
  //   this.loadWidget({
  //     kind: 'site_form',
  //     source: this,
  //     id: `site-form-${this.mget('custId')}`,
  //     uiHandler: [this],
  //     service: "site-created"
  //   })
  //   this.ensurePart("entries-manual").then((p) => {
  //     p.el.dataset.state = 0;
  //   });
  // }


  /**
   * 
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:213", service, cmd, this)
    switch (service) {
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
        this.selectSite(cmd);
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_work
