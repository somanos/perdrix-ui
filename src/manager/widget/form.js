require('./form/skin');

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
  async loadSitesList(cmd) {
    let api = {
      service: "site.list",
      custId: this.mget('custId'),
    };
    let itemsOpt = {
      kind: 'site_item',
      service: 'set-site'
    }
    let p = await this.ensurePart("entries-manual");
    p.el.dataset.state = 1;

    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this));
    })
  }

  /**
  * 
  */
  async selectSite(cmd) {
    this._locationCompleted = 0;
    if (!cmd.mget('siteId')) {
      let { siteId } = await this.postService("site.create", cmd.data())
      cmd.mset({ siteId })
      this.debug("AAA:44", siteId, cmd, cmd.mget('siteId'))
    }
    this.debug("AAA:46", cmd, cmd.mget('siteId'))
    this.ensurePart("site-address").then((p) => {
      p.feed({
        ...cmd.data(),
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
  async promptSite(cmd) {
    this.loadWidget({
      kind: 'form_site',
      source: this,
      id: `site-form-${this.mget('custId')}`,
      uiHandler: [this],
      service: "site-created"
    })
    this.ensurePart("entries-manual").then((p) => {
      p.el.dataset.state = 0;
    });
  }

  /**
  * 
  */
  async addressSelected(cmd) {
    await this.clearList();
    let p = await this.ensurePart("entries-manual");
    const {
      street, city, housenumber, postcode, label
    } = cmd.mget('properties') || {};
    this._locationCompleted = 1;
    p.feed(address(this, { street, city, housenumber, postcode }));
    let addr = await this.ensurePart("address-entry");
    addr.setValue(label)
  }

  /**
   * 
   */
  message(m, timeout = 3000) {
    this.ensurePart("message").then((p) => {
      p.feed(Skeletons.Note(m))
      setTimeout(() => {
        p.clear()
      }, timeout)
    })

  }
}
module.exports = __form_core
