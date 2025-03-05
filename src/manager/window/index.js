//const __webinar_socket = require('./socket');
class __window_perdrix extends DrumeeInteractWindow {
  constructor(...args) {
    super(...args);
    this.getCurrentApi = this.getCurrentApi.bind(this);
  }

  /**
   * 
   * @param {*} opt 
   */
  async initialize(opt) {
    this.size = {
      width: 600,
      height: 450
    }

    super.initialize(opt);

    this.style.set({
      width: this.size.width,
      height: this.size.height
    });
    RADIO_BROADCAST.on(_e.responsive, this._responsive);

  }

  static initClass() {
    this.prototype.behaviorSet = {
      bhv_radio: 1,
    };
  }

  onPartReady(child, pn) {
    this.raise();
    switch (pn) {
      case _a.content:
        child.feed(require("./skeleton/content/grid")(this));
        break;
    }
  }

  /**
   * @param {*} type
  */
  getCurrentApi(type) {
    return this._api
  }


  /**
   * 
   */
  async onDomRefresh() {
    this.feed(require('./skeleton/loading')(this));
  }


  /**
 * 
 * @param {LetcBox}  cmd 
 * @param {object}  args 
 */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.model.get(_a.service);
    this.debug(`AAA:61 sd onUiEvent=${service}`, cmd, cmd.get(_a.state), this);
    switch (service) {
      case 'close-form':
        this.__wrapperDialog && this.__wrapperDialog.clear();
        break;
      case null:
      case undefined:
        break;

      case _a.search:
        //this.debug("AAA:132", cmd, args, this);
        Wm.search(cmd, args);
        break;

      case null:
      case undefined:
        break;

      default:
        super.onUiEvent(cmd, args);
    }
  }

}

__window_perdrix.initClass();

module.exports = __window_perdrix;

