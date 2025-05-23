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
    let c = this.mget(_a.content);
    let r = this.mget(_a.reference);
    this.debug("AAA:27", c, r)
    return {
      customer: r[0],
      site: r[1],
      work: r[2],
      content: c,
      ...c,
    }
    switch (this.mget(_a.type)) {
      case "site":
        return {
          id: c.siteId,
          city: c.city,
          companyclass: r.companyclass,
          custId: r.custId,
          custName: r.custName,
          gender: r.gender,
          location: c.location,
          postcode: c.postcode,
          siteId: c.siteId,
          geometry: c.geometry,
          customer: r
        }
      case "customer":
        return {
          id: c.custId,
          city: c.city,
          companyclass: c.companyclass,
          custId: c.custId,
          custName: c.custName,
          gender: c.gender,
          location: c.location,
          postcode: c.postcode,
          siteId: c.siteId,
          geometry: c.geometry,
        }
      case "poc":
        return {
          id: c.pocId,
          pocId: c.pocId,
          gender: c.gender,
          phones: c.phones,
          email: c.email,
          pocName: c.pocName,
          lastname: c.lastname,
          firstname: c.firstname,
        }
        break;
      case "mission":
      case "work":
        return {
          custName: r.custName,
          id: c.workId,
          workType: c.type,
          city: c.city,
          location: c.location,
          postcode: c.postcode,
          siteId: c.siteId,
          workId: c.workId,
          customer: r,
          description: c.description
        }
      case "quote":
        return {
          custName: c.custName,
          workId: c.workId,
          quoteId: c.quoteId,
          city: c.city,
          location: c.location,
          postcode: c.postcode,
          siteId: c.siteId,
          workId: c.workId,
          chrono: c.chrono,
          ht: c.ht,
          ttc: c.ttc,
          tva: c.tva,
          discount: c.discount,
          filepath: c.filepath,
          description: c.description
        }
      case "bill":
        return {
          custName: c.custName,
          workId: c.workId,
          quoteId: c.quoteId,
          city: c.city,
          location: c.location,
          postcode: c.postcode,
          siteId: c.siteId,
          workId: c.workId,
          chrono: c.chrono,
          ht: c.ht,
          ttc: c.ttc,
          tva: c.tva,
          filepath: c.filepath,
          description: c.description
        }
    }

  }

  /**
    * User Interaction Evant Handler
    * @param {View} trigger
    * @param {Object} args
    */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.mget(_a.service);
    this.debug("AAA:27", cmd, args, service, this)
    this.triggerHandlers({
      service: "open-viewer"
    })
  }
}

module.exports = __search_result