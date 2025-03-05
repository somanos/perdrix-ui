const __window = require('..');
class __window_perdrix extends __window {

  // ===========================================================
  //
  // ===========================================================
  async initialize(opt) {
    require('./skin');
    super.initialize(opt);
    this.model.atLeast({
      widgetId: this._id,
      filename: LOCALE.LICENCES,
      itemsOpt: {
        kind: opt.currentView || 'thumbnail_grid',
        type: 'perdrix',
        filetype: 'perdrix'
      }
    });
    this.style.set({ height: 525 });
  }

  /**
   * 
   */
  onDomRefresh() {
    this.debug("AAA:26", this)
    super.onDomRefresh();
    this.feed(require('./skeleton')(this));
    this.setupInteract();
  }

  /**
   * 
   */
  getCurrentApi() {
    this.debug("AAA:26", {
      service: _SVC.perdrix.list,
      hub_id : Visitor.id
    })
    return {
      service: _SVC.perdrix.list,
      hub_id : Visitor.id
    }
  }

  /**
   * 
   * @param {*} source 
   */
  selectCustomer(source) {
    this._data = {};
    let attr = [
      'domain_name',
      _a.email,
      'contact_id',
      'customer_id',
      'bu_id',
      'number_of_bays',
      'status',
      'isCustomer',
      _a.firstname,
      _a.lastname,
      _a.filename
    ];

    for (let k of attr) {
      this._data[k] = source.mget(k);
    }
    let label = this._data.filename;
    let icon = 'desktop_contactbook';
    if (this._data.customer_id) {
      icon = 'account'
    }
    let partName = `entry-container-end_user`;
    let old = this.getPart(partName);
    let opt = {
      label, 
      icon, 
      cancelService:'remove-customer', 
      itemService: 'view-costumer',
      partName : 'mini-view'
    }
    let view = require("../skeleton/mini-view")(this, opt);
    this.debug("AAA:81", partName, view, this.__entries, this._data);
    this.__entries.replace(old, view);
  }

  /**
   * 
   * @param {*} source 
   */
  removeCustomer(source) {
    this._data = {};
    //let old = this.__entries.children.last();
    let partName = `mini-view`;
    let old = this.getPart(partName);

    let opt = {
      validators: [{
        reason: LOCALE.REQUIRE_THIS_FIELD,
        comply: Validator.require
      }],
      interactive: 1,
      service: _a.search,
      searchOpt: {
        api: _SVC.customer.search,
        itemsOpt: {
          kind: 'thumbnail_grid',
          type: 'customer',
          service: 'select-customer',
          uiHandler: [this]
        }
      },
    }
    let view = require("../skeleton/entry")(this, 'END_USER', opt);
    this.debug("AAA:1aa13", old, view, this.__entries, this._data);
    this.__entries.replace(old, view);
  }

  /**
   * 
   * @param {*} args 
   */
  getPlaceholder(args) {
    return Skeletons.Note({
      className :`${this.fig.group}__placeholder`,
      content : LOCALE.LICENCE_PLACEHOLDER
    })
  }


  /**
   * 
   * @param {*} args 
   */
  _createLicence() {
    if (!this.__entryDomainName.validateData()) return;
    if (!this.__entryNumberOfBays.validateData()) return;
    if (!this.__entryEndUser.validateData()) return;
    let data = this.getData();
    for (let k in data) {
      data[k] = data[k].trim();
    }
    if (!/\w{1,}\.\w/.test(data.domain_name)) {
      this.__entryDomainName.showError(LOCALE.REQUIRE_DNS_NAME);
      return;
    }
    if (!/^[0-9]+$/.test(data.number_of_bays)) {
      this.__entryNumberOfBays.showError(LOCALE.REQUIRE_NUMBER);
      return;
    }
    data.capacity = data.number_of_bays;
    data.status = 'trial';
    if (this.__perdrixTypeSwitch.getState()) {
      data.status = _a.active;
    }
    data = {...this._data, ...data};
    this.debug("AAA:155", data, this._data);
    this.postService(_SVC.perdrix.generate, {data}, {async:1})
    .then((res)=>{
      let buttons = require("../skeleton/buttons")(this, {
        content : LOCALE.SEE,
        service : 'see-perdrix'
      }, {
        content : LOCALE.SEND,
        service : 'send-perdrix'
      });
      let ack = require("../skeleton/acknowledge")(this, LOCALE.LICENCE_STORE_ACK, buttons);
      this.__wrapperDialog.feed(ack);
      this.debug("AAA:188", data, this._data, res);
    })
  }



  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.model.get(_a.service);
    //this.debug(`AAA:80xs onUiEvent=${service}`, cmd, args, cmd.get(_a.state), this);
    if (cmd.wait) {
      cmd.wait(0);
    }
    switch (service) {
      case "open-node":
        Wm.launch({
          kind: 'viewer_perdrix',
          media: cmd,
          uiHandler: this
        }, {
          explicit: 1
        });
        break;
      case 'submit-perdrix-creation':
        this.debug("AAA:109", this);
        this._createLicence();
        break;
      case 'select-customer':
        this.selectCustomer(cmd);
        break;
      case 'remove-customer':
        this.removeCustomer(cmd);
        break;
      case 'view-customer':
        Wm.launch({
          ...this._data,
          kind: 'viewer_customer',
          uiHandler: this
        }, {
          explicit: 1
        });
        break;
      case _e.create:
        this.__wrapperDialog.feed(require("./skeleton/form").default(this));
        break;
      default:
        super.onUiEvent(cmd, args);
    }
  }

  /**
   * To start the Meeting 
   * @param {LetcBox}  media 
   */
  showLicence(media) {
    let md = media.mget(_a.metadata);
    if (_.isString(md)) {
      md = JSON.parse(md);
    }
    let meetingInfo;
    if (_.isString(md.content)) {
      meetingInfo = JSON.parse(md.content)
    } else {
      meetingInfo = md.content;
    }


    //const md =  JSON.parse(media.mget(_a.metadata));
    //const meetingInfo =  JSON.parse(md.content)

    let opt = {
      kind: "perdrix_viewer",
    }
    this.debug('AAAAA 104', opt);
    Wm.launch(opt);
    return
  }

  /**
   * to copy  URL
   * @param {LetcBox}  media 
   */
  copyURL(media) {
    this.postService(_SVC.room.public_link, {
      hub_id: media.mget(_a.hub_id),
      nid: media.mget(_a.nid)
    }).then((data) => {
      Utils.copyToClipboard(data.link);
      this.acknowledge()
    })
    return;
  }
}


module.exports = __window_perdrix;

