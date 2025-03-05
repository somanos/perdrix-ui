/* ==================================================================== *
*   Copyright Xialia.com  2011-2021
*   FILE : /src/drumee/builtins/player/schedule/index.js
*   TYPE : Component
* ==================================================================== */

//#########################################

const __viewer = require('..');
class __viewer_perdrix extends __viewer {
  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();

    this.ack = require('./skeleton/acknowledge')(this);
    if (!opt.media) return;
    this.media = opt.media;
    let attr = [
      'contact_id',
      'customer_id',
      'bu_id',
      'number_of_bays',
      _a.ctime,
      _a.date,
      _a.atime,
      _a.domain,
      _a.email,
      _a.status,
      _a.key,
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
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:59 onUiEventZZ", service, this);
    switch (service) {
      case _e.copy:
        Utils.copyToClipboard(data.link);
        this.__footer.feed(require('./skeleton/acknowledge')(this));
        setTimeout(() => {
          this.__footer.clear()
        }, Visitor.timeout(3000))
        break;

      case 'update-perdrix':
        this.postService('perdrix.update', {
          key: this.mget(_a.key),
          hub_id: Visitor.id,
          status: cmd.mget(_a.status)
        }, { async: 1 }).then((data) => {
          this.debug("AAA:75", data);
          let { status } = data;
          if (status) {
            if (status == _a.active) {
              cmd.set({ content: LOCALE.REVOKE_LICENCE });
              cmd.mset({ status : 'trial'});
            } else {
              cmd.set({ content: LOCALE.ACTIVATE_LICENCE });
              cmd.mset({ status : _a.active});
            }
          }
          if (!data || data.error) {
            this.warn("FAILED TO UPDATE", data.error);
          } else {
            this.__footer.feed(require('./skeleton/acknowledge')(this));
            setTimeout(() => {
              this.__footer.clear()
            }, Visitor.timeout(3000))
          }
        })
        break;

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __viewer_perdrix
