
export class Customer extends LetcBox {

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
  data() {
    const {
      custId,
      custName,
      ctime,
      category,
      companyclass,
      gender,
      location,
      street,
      city,
      postcode
    } = this.model.toJSON();

    return {
      custId,
      custName,
      ctime,
      category,
      companyclass,
      gender,
      location,
      street,
      city,
      postcode
    }
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(cmd, args = {}) {
    this.triggerHandlers({
      service: "open-viewer"
    })
  }

}
