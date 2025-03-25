const __window = require('..');
const { placeholder } = require("./skeleton/widget")

class __window_customer extends __window {

  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
    this.source = opt.source;
    this.mset(opt.source.data())
  }

  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.debug("AAA:10", this.source.data())
    this.feed(require('./skeleton')(this));
    this.setupInteract();
    this.raise();
    let pos = this.$el.position();
    if (this.anti_overlap(pos)) {
      this.$el.css(pos)
    }
  }


  /**
   * 
   */
  async feedList(api, itemsOpt, onEmpty) {
    let list = await this.ensurePart(_a.list);
    list.model.unset(_a.itemsOpt)
    list.mset({ api, itemsOpt });
    list.restart();

    list.once(_e.data, async (data) => {
      if (_.isEmpty(data)) {
        return onEmpty(list);
      }
    })
    list.once(_e.eod, async (e) => {
      if (list.isNaturalyEmpty()) {
        onEmpty(list);
      }
    });
    list.once(_e.error, async () => {
      onEmpty(list);
    });
  }

  /**
   * 
   */
  async loadWorkList(cmd) {
    let filters = await this.getSelectedItems("menu-items", _a.status);
    if (cmd.mget('isTrigger') && !cmd.mget(_a.state)) return;
    let api = {
      service: "perdrix.work_list",
      custId: this.mget('custId'),
      status: filters
    };
    let itemsOpt = {
      kind: 'work_item',
    }
    this.feedList(api, itemsOpt, (list) => {
      list.model.unset(_a.itemsOpt)
      list.feed(placeholder(this));
    })
  }


  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.model.get(_a.service);
    this.debug(`AAA:86 onUiEvent=${service}`, cmd, args, this);
    switch (service) {
      case "show-contacts":
        break;
      case 'show-photos':
        break;
      case 'show-notes':
        break;
      case 'create-work':
        this.loadWorkForm(cmd)
        break;
      case 'show-works':
        this.loadWorkList(cmd)
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

__window_customer.initClass();

module.exports = __window_customer;

