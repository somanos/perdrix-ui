
const { Customer } = require("..");
class __customer_item extends Customer {

  /**
  * 
  */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.model.set({ type: "customer" })
    this.skeleton = require('./skeleton')(this);
  }

  /**
   * 
   * @param {*} trigger 
   * @param {*} args 
   */
  onUiEvent(trigger, args = {}) {
    const service = this.mget(_a.service);
    this.debug("AAA:22", service, trigger.mget(_a.service))
    this.triggerHandlers({
      service,
    })
  }


}

module.exports = __customer_item