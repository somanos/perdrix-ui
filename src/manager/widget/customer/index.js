
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
      category,
      city,
      companyclass,
      ctime,
      custId,
      custName,
      lastname,
      firstname,
      gender,
      geometry,
      location,
      postcode,
      street,
      type,
    } = this.model.toJSON();

    return {
      category,
      city,
      companyclass,
      ctime,
      custId,
      custName,
      lastname,
      firstname,
      gender,
      geometry,
      location,
      postcode,
      street,
      type,
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
