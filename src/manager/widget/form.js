require('./form/skin');
// const { address } = require("../widget/skeleton")

const Core = require('../core');
const { placeholder } = require("./skeleton")

class __form_core extends Core {
  /**
   * 
   */
  initialize(opt = {}) {
    super.initialize(opt);
    this.declareHandlers();
  }

  /**
   * 
   */
  static initClass() {
    this.prototype.events = {
      drop: '_upload',
      dragenter: 'fileDragEnter',
      dragover: 'fileDragOver'
    };
  }

  /**
  * 
  */
  async loadSitesList(cmd) {
    let api = {
      service: "site.list",
      custId: this.mget('custId'),
    };
    let itemsOpt = {
      kind: 'site_item',
      service: 'set-site',
      uiHandler: [this]
    }
    let p = await this.ensurePart("entries-manual");
    p.el.dataset.state = 1;

    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this));
    })
  }

  /** */
  syncGeometry() {
    /** DO NOT DELETE */
  }
  /**
  * 
  */
  async selectSite(data) {
    this.debug("AAA:46", data)
    this.ensurePart("site-address").then((p) => {
      p.feed({
        ...data,
        kind: 'location_view',
        state: 1
      })
    })
    this.ensurePart("entries-manual").then((p) => {
      p.el.hide()
    })
  }



  /**
  * 
  */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:77", service, cmd, this)
    switch (service) {
      case "select-site":
        let { choice } = cmd.getData();
        switch (choice) {
          case "same-address":
            this.selectSite(this)
            break;
          case "list-sites":
            this.loadSitesList(cmd)
            break;
          case "add-site":
            this.promptSite(this);
            break;
        }
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

__form_core.initClass();
module.exports = __form_core
