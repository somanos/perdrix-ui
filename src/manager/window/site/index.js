const __window = require('..');

class __window_site extends __window {

  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
  }

  /**
 * 
 */
  data() {
    const {
      city,
      citycode,
      countrycode,
      custId,
      geometry,
      id,
      siteId,
      location,
      postcode,
    } = this.model.toJSON();

    return {
      city,
      id,
      citycode,
      countrycode,
      custId,
      geometry,
      location,
      postcode,
      siteId,
      type: 'site'
    }
  }
  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
    this.debug("AAA:22", this)
    setTimeout(() => {
      this.loadWorkList({ service: "mission-hitsory" })
    }, 500)
  }



  /**
  * 
  */
  async loadContextBar(cmd) {
    let context = await this.ensurePart("context-bar");
    let name = "works";
    if (cmd) {
      name = cmd.mget(_a.name);
    }
    let buttons;
    let state = 1;
    let service;
    switch (name) {
    }

  }

 
  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.model.get(_a.service);
    this.debug(`AAA:170 onUiEvent=${service}`, cmd, args, this);
    switch (service) {
      case "mission-hitsory":
        this.loadMissionWindow(cmd);
        break;
      default:
        super.onUiEvent(cmd, args);
    }
  }

  /**
   * To start the Meeting 
   * @param {LetcBox}  media 
   */
  showDetails(cmd) {
    return
  }

}

__window_site.initClass();

module.exports = __window_site;

