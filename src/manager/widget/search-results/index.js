/* ==================================================================== *
* Widget automatically generated on 2025-03-05T03:29:33.853Z
* npm run add-widget -- --fig=<grpup.family> --dest=/path/to/the/widget
* ==================================================================== */

class __search_result extends LetcBox {


  /**
  * 
  */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.skeleton = require('./skeleton')(this);
  }

  /**
  * 
  */
  data() {
    let content = this.mget(_a.content)
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
    } = content;

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

module.exports = __search_result