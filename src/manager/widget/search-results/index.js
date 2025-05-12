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
    this.mset(this.data())
  }

  /**
  * 
  */
  data() {
    let content = this.mget(_a.content);
    let reference = this.mget(_a.reference);
    switch (this.mget(_a.type)) {
      case "site":
        return {
          id: content.siteId,
          city: content.city,
          companyclass: reference.companyclass,
          custId: reference.custId,
          custName: reference.custName,
          gender: reference.gender,
          location: content.location,
          postcode: content.postcode,
          siteId: content.siteId,
          geometry: content.geometry,
          customer: reference
        }
      case "customer":
        return {
          id: content.custId,
          city: content.city,
          companyclass: content.companyclass,
          custId: content.custId,
          custName: content.custName,
          gender: content.gender,
          location: content.location,
          postcode: content.postcode,
          siteId: content.siteId,
          geometry: content.geometry,
        }
      case "poc":
        return {
          id: content.pocId,
          pocId: content.pocId,
          gender: content.gender,
          phones: content.phones,
          email: content.email,
          pocName: content.pocName,
          lastname: content.lastname,
          firstname: content.firstname,
        }
        break;
      case "mission":
      case "work":
        return {
          custName: reference.custName,
          id: content.workId,
          workType: content.type,
          city: content.city,
          location: content.location,
          postcode: content.postcode,
          siteId: content.siteId,
          workId: content.workId,
          customer: reference,
          description: content.description
        }
        break;
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