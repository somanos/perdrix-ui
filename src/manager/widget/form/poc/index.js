
const Core = require('../../../core');
require('../skin');
const { acknowledge } = require("../../skeleton")

class __form_poc extends Core {

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
    let fields = [_a.mobile, 'city', 'postcode']
    for (let name of fields) {
      if (!args[name]) {
        this.changeDataset(name, _a.error, 1)
        error = 1;
      } else {
        this.changeDataset(name, _a.error, 0)
      }
    }
    if (error) return;
    args.category = this.mget(_a.category)

    this.debug("AAA:323", args, this);
    this.postService("perdrix.post_create", { args }).then((data) => {
      const { custName } = data;
      this.__content.feed(acknowledge(this, {
        message: `${custName} a bien ete cree`,
      }))
    }).catch((e) => {
      this.__wrapperDialog.feed(acknowledge(this, {
        message: LOCALE.ERROR_SERVER,
        failed: 1,
        service: 'close-dialog',
      }))
      this.debug("AAA:377 FAILED", e)
    })
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
    this.debug("AAA:212b", service, cmd.mget(_a.name), cmd, this)
    switch (service) {
      case _a.create:
        this.createSite(cmd);
        break;

      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_poc
