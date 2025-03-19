
const { Customer } = require("../customer");
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

}

module.exports = __customer_item