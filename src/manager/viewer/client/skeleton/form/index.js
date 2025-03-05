
class __window_company_form extends DrumeeInteractPlayer {
  /**
   * @param {*} opt
  */
  initialize(opt) {
    require('./skin');
    super.initialize(opt);
  }

  /**
   * 
  */
  onDomRefresh() {
    this.feed(require('./skeleton/index')(this));
    this.setupInteract();
    this.debug("AAA:17", this);
  }

  /**
   * @param {*} cmd
   * @param {*} args
  */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.model.get(_a.service);
    this.verbose(`AAA:184 onUiEvent=${service}`, args, cmd.get(_a.state), cmd, this);
    if (!args.no_raise) this.raise(cmd);
    switch (service) {
      case _a.update:
        return this.debug('dfsfsfs');

      default:
        super.onUiEvent(cmd, args);
    }
  }

  /**
   * 
  */
  setupInteract() {
    //abstract
    return
  }
  
  /**
  * 
  */
  handleError(args) {
    this.debug(`bbaaaa 81 handleError`, args, this);
    if (args.error) {
      this.__wrapperError.feed(
        Skeletons.Note(LOCALE.INVALID_EMAIL_FORMAT, `${this.fig.family}__error`)
      );
    } else {
      this.__wrapperError.clear();
    }
  }
}


module.exports = __window_company_form;