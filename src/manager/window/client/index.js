const __window = require('..');
class __window_customer extends __window {

  // ===========================================================
  //
  // ===========================================================
  async initialize(opt) {
    require('./skin');
    this.size = {
      width: 600,
      height: 450
    }
    super.initialize(opt);
    this.model.atLeast({
      widgetId: this._id,
      filename: "customer",
      itemsOpt: {
        kind: 'thumbnail_grid',
      }
    });
    //this.contentSkeleton = require("../skeleton/content/grid")
  }

  /**
   * 
   */
  onDomRefresh() {
    super.onDomRefresh();
    this.feed(require('./skeleton')(this));
    this.setupInteract();
  }


  /**
  * 
  */
  getCurrentApi() {
    return {
      service: _SVC.customer.list
    }
  }

  /**
 * 
 * @param {*} source 
 */
  selectContact(source) {
    this._data = {};
    let attr = [
      _a.firstname,
      _a.lastname,
      _a.email,
      _a.filename
    ];

    for (let k of attr) {
      this._data[k] = source.mget(k);
      let c = this.getPart(`entry-${k}`);
      if(c && c.setValue){
        c.setValue(this._data[k])
      }
    }
    this.debug("AAAA:61", this._data);
    Wm.search();
  }

  /**
 * 
 * @param {*} source 
 */
  selectCompany(source) {
    this._data = {};
    let attr = [
      'bu_id',
      'legal_name',
      'commercial_name',
      _a.filename
    ];

    for (let k of attr) {
      this._data[k] = source.mget(k);
    }
    let label = this._data.filename;
    let icon = 'company';
    let partName = `entry-container-${source.mget(_a.filetype)}`;
    let old = this.getPart(partName);
    let opt = {
      label, 
      icon, 
      cancelService:'remove-company', 
      itemService: 'view-company'
    }
    let view = require("../skeleton/mini-view")(this, opt);
    this.__entries.replace(old, view);
  }

  /**
   * 
   * @param {*} source 
   */
  removeCompany(source) {
    this._data = {};
    let old = this.__entries.children.last();
    let opt = {
      validators: [{
        reason: LOCALE.REQUIRE_THIS_FIELD,
        comply: Validator.require
      }],
      interactive: 1,
      service: _a.search,
      searchOpt: {
        api: _SVC.enterprise.search,
        itemsOpt: {
          kind: 'thumbnail_grid',
          type: 'company',
          service: 'select-company',
          uiHandler: [this]
        }
      },
    }
    let view = require("../skeleton/entry")(this, 'COMPANY', opt);
    this.debug("AAA:108", old, view, this.__entries, this._data);
    this.__entries.replace(old, view);
  }

  /**
 * 
 * @param {*} args 
 */
  _acknowledge(args) {
  }

  /**
   * 
   */
  openSettings(cmd) {
    if (!this.dialogWrapper.isEmpty()) {
      this.dialogWrapper.clear();
      return
    }
    this.dialogWrapper.feed({
      kind: 'schedule_invitation'
    });
  }



  /**
   * 
   * @param {LetcBox}  cmd 
   * @param {object}  args 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.model.get(_a.service);
    this.debug(`AAA:86 onUiEvent=${service}`, cmd, args, cmd.get(_a.state), this);
    if (cmd.wait) {
      cmd.wait(0);
    }
    switch (service) {
      case "open-node":
        // Need to  update to viewer_costumer
        Wm.launch({
          kind: 'viewer_customer',
          domain: cmd.mget(_a.domain),
          date: cmd.mget(_a.date),
          key: cmd.mget(_a.key),
          media: cmd,
          uiHandler: this
        }, {
          explicit: 1
        });
        break;
      case 'select-company':
        this.selectCompany(cmd);
        break;
      case 'remove-company':
        this.removeCompany(cmd);
        break;
      case 'select-contact':
        this.selectContact(cmd);
        break;
      case 'remove-contact':
        //.removeCompany(cmd);
        break;

      case _e.create:
        this.__wrapperDialog.feed(require("./skeleton/form").default(this))
        break;

      default:
        super.onUiEvent(cmd, args);
    }
  }

  /**
   * To start the Meeting 
   * @param {LetcBox}  media 
   */
  showcustomer(media) {
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
    // const md =  JSON.parse(media.mget(_a.metadata));
    // const meetingInfo =  JSON.parse(md.content)
    let opt = {
      kind: "customer_viewer",
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

__window_customer.initClass();

module.exports = __window_customer;

