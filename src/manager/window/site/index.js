const __window = require('..');
const { workTab, pocTab } = require("./skeleton/widget")
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
    this.loadContextBar();
    //this.loadWorkList({ service: "mission-hitsory", format: _a.small })
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
    this.debug("AAA:161", this, name)
    switch (name) {
      case "works":
        context.feed(workTab(this));
        this.loadWorkList(
          { service: "mission-hitsory", format: _a.small },
          await this.getSortOptions(null, ["fdate"])
        );
        break;
      case "pocs":
        context.feed(pocTab(this));
        this.loadPocList(cmd)
        break;
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
      case 'load-context':
        this.loadContextBar(cmd, args);
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

