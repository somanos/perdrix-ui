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
    this.debug("AAA:26", this.mget(_a.type), c, r)
    return {
      customer: r[0],
      site: r[1],
      work: r[2],
      content: c,
      ...c,
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