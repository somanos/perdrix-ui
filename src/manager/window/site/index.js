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
  async promptPoc(cmd) {
    let { siteId, custId } = this.model.toJSON();
    this.loadWidget({
      kind: 'form_poc',
      customer: this.mget('customer'),
      id: `poc-form-${this.mget(_a.id)}`,
      uiHandler: [this],
      custId,
      siteId,
      service: "poc-created"
    })
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
    switch (name) {
      case "works":
        context.feed(workTab(this));
        this.loadWorkList(
          { service: "mission-hitsory", format: 'big' },
          await this.getSortOptions(null, ["fdate"])
        );
        break;
      case "pocs":
        context.feed(pocTab(this));
        this.loadSitePocs(cmd)
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
        break;
      case 'create-poc':
        this.promptPoc(cmd);
        break;
      case 'poc-created':
        this.loadSitePocs(cmd)
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

