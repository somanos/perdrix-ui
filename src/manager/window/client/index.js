const __window = require('..');
class __window_client extends __window {

  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
  }

  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.debug(`STARTING CLIENT WINDOW`, this);

    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
  }


    

  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.model.get(_a.service);
    this.debug(`AAA:86 onUiEvent=${service}`, cmd, args, cmd.get(_a.state), this);
    switch (service) {
      case "show-contacts":
        break;
      case 'show-photos':
        break;
      case 'show-notes':
        break;
      case 'show-travaux':
        break;
      case 'show-solde':
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

__window_client.initClass();

module.exports = __window_client;

