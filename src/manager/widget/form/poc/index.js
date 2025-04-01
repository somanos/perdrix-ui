
require('./skin');
const Form = require('..');

class __form_poc extends Form {

  constructor(...args) {
    super(...args);
    this.searchLocation = this.searchLocation.bind(this);
  }

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.model.atLeast({
      type: 'poc',
      category: 0
    })
    this.source = opt.source;
  }

  /**
   * 
   */
  // onPartReady(child, pn) {
  //   this.raise();
  //   switch (pn) {
  //     case 'entries':
  //     case _a.lastname:
  //       child.on(_e.blur, (e) => {
  //         this.clearList();
  //       })
  //       break;
  //     default:
  //       super.onPartReady(child, pn);
  //   }
  // }
  /**
   * 
   */
  createPoc() {
    let args = this.getData();
    this.debug('AAA:48', args, this)
    let fields = [_a.email, _a.mobile, 'office', _a.home, 'fax'];
    let error = 0;
    for (let name of fields) {
      this.debug('AAA:52', name, args[name])
      if (args[name]) {
        switch (name) {
          case _a.email:
            if (!args[name].isEmail()) {
              this.changeDataset(name, _a.error, 1)
              error = 1;
            } else {
              this.changeDataset(name, _a.error, 0)
            }
            break;
          case _a.mobile:
          case _a.home:
          case 'office':
          case 'fax':
            if (!args[name].isPhoneNumber()) {
              this.changeDataset(name, _a.error, 1)
              error = 1;
            } else {
              this.changeDataset(name, _a.error, 0)
            }
            break;
        }
      } else {
        this.changeDataset(name, _a.error, 0)
      }
    }
    if (error) return;

    this.debug("AAA:323", args, this);
    // this.postService("perdrix.post_create", { args }).then((data) => {
    //   const { custName } = data;
    //   this.__content.feed(acknowledge(this, {
    //     message: `${custName} a bien ete cree`,
    //   }))
    // }).catch((e) => {
    //   this.__wrapperDialog.feed(acknowledge(this, {
    //     message: LOCALE.ERROR_SERVER,
    //     failed: 1,
    //     service: 'close-dialog',
    //   }))
    //   this.debug("AAA:377 FAILED", e)
    // })
  }


  /**
   * 
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }

  /**
   * 
   */
  onUiEvent(cmd, args = {}) {
    let service = args.service || cmd.mget(_a.service);
    this.debug("AAA:107", service, cmd.mget(_a.name), cmd, this)
    switch (service) {
      case _a.create:
        this.createPoc(cmd);
        break;
      case "select-site":
        let { choice } = cmd.getData();
        this.debug("AAA:238", choice, service, cmd)
        switch (choice) {
          case "same-address":
            this.selectSite(this)
            break;
          case "list-sites":
            this.loadSitesList(cmd)
            break;
          case "add-site":
            this.promptSite(cmd);
            break;
        }
        break;

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_poc
