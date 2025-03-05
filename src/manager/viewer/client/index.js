/* ==================================================================== *
*   Copyright Xialia.com  2011-2021
*   FILE : /src/drumee/builtins/player/schedule/index.js
*   TYPE : Component
* ==================================================================== */

//#########################################

const __viewer = require('..');
class __viewer_customer extends __viewer {
  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    if(!opt.media) return;
    this.media = opt.media;
    let attr = [
      'contact_id',
      'customer_id',
      'bu_id',
      'number_of_bays',
      _a.ctime,
      _a.date,
      _a.email,
      _a.fullname,
      _a.firstname,
      _a.lastname,
      _a.filename
    ];

    for (let k of attr) {
      this.mset(k, this.media.mget(k));
    }

  }

 
  /**
   * 
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
    this.debug("AAA:36", this, this.el);
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.get(_a.service) || cmd.get(_a.name);
    switch (service) {

      case _e.copy:
        Utils.copyToClipboard(data.link);
        this.__footer.feed(require('./skeleton/acknowledge')(this));
        const f = () => {
          this.__footer.clear()
        }
        _.delay(f, Visitor.timeout(3000));
        break;

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __viewer_customer
