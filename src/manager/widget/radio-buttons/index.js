
class __radio_buttons extends LetcBox {

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.skeleton = require("./skeleton")
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(cmd, args = {}) {
    let { value } = this.mget("buttons")[cmd.mget(_a.position)]
    this.mset({ value })

    this.triggerHandlers({
      service: this.mget(_a.service)
    })
  }

}

module.exports = __radio_buttons