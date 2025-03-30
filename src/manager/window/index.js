//const __webinar_socket = require('./socket');
const Utils = require("../core");
class __window_perdrix extends Utils {
  constructor(...args) {
    super(...args);
    this.getCurrentApi = this.getCurrentApi.bind(this);
  }

  initialize(opt = {}) {
    super.initialize(opt);
    this._timer = {}
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


  // /**
  //  * 
  //  */
  // async onDomRefresh() {
  //   this.feed(require('./skeleton/loading')(this));
  // }

  // /**
  //   * 
  //   */
  // loadCustomer(cmd, hide = 0) {
  //   const { custId } = cmd.mget('custId')
  //   this.loadWidget({
  //     kind: 'window_customer',
  //     id: `customer-${custId}`,
  //     source: cmd
  //   })
  // }

  /**
   * 
   */
  loadCustomer(cmd, type) {
    const { custId } = cmd.model.toJSON();
    Wm.windowsLayer.append({
      kind: 'window_customer',
      id: `customer-${custId}`,
      source: cmd
    });
    setTimeout(()=>{
      let w = Wm.windowsLayer.children.last();
      if(w && w.raise) w.raise()
    }, 1000)
  }

  /**
    * 
    */
  loadWorkForm(cmd, hide = 0) {
    const { custId } = this.mget('custId');
    this.loadWidget({
      ...this.source.data(),
      kind: 'work_form',
      id: `work-form-${custId}`,
    })
  }

  /**
  * 
  */
  throtle(cmd) {
    return new Promise((will, wont) => {
      if (!cmd || !cmd.getValue) return;
      if (this._timer[cmd.cid]) {
        clearTimeout(this._timer[cmd.cid])
      }
      this._timer[cmd.cid] = setTimeout(async () => {
        await will(cmd);
        this._timer[cmd.cid] = null;
      }, 1000)
    })
  }

  /**
   * 
   */
  async getSelectedItems(partname, attr) {
    let roll = await this.ensurePart(partname);
    let filters = [];
    roll.collection.map((m) => {
      if (m.get(_a.state)) {
        filters.push(m.get(attr))
      }
    })
    return filters;
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


module.exports = __window_perdrix;

