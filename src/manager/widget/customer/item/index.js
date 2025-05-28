
const { Customer } = require("..");
const { loadWidget } = require("../../../utils");
class __customer_item extends Customer {

  /**
  * 
  */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.model.set({ type: "customer" })
    this.skeleton = require('./skeleton')(this);
    this.loadWidget = loadWidget.bind(this);


  }

  /**
   * 
   */
  updateCustomer() {
    const { custId } = this.data();
    this.debug("AAA:24", this)
    this.loadWidget({
      kind: 'form_customer',
      id: `customer-form-${custId}`,
      uiHandler: this.getHandlers(_a.ui),
      ...this.data(),
      type: !this.mget(_a.gender) ? 'company' : 'person',
      callbackService: this.mget('callbackService'),
      isUpdate: 1
    })
  }

  /**
   * handles UI events triggered by the user through the widget trigger
   * @param {*} trigger
   */
  onUiEvent(trigger, args = {}) {
    const service = trigger.mget(_a.service);
    this.debug("AAA:42", service, trigger.mget(_a.service))
    switch (service) {
      case 'update-customer':
        this.updateCustomer(trigger);
        break;
      default:
        this.triggerHandlers({
          service: this.mget(_a.service),
        })
    }
  }


}

module.exports = __customer_item