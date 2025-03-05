// ==================================================================== *
//   Copyright Xialia.com  2011-2022
//   FILE : desk/media/core
//   TYPE : 
// ==================================================================== *

const VIEW_GRID = 'thumbnail_perdrix_grid';
const VIEW_ROW = 'thumbnail_perdrix_row';

const OPEN_NODE = "open-node";
const SEEDING = 'seeding';

require('./skin');

class __thumbnail_core extends DrumeeMediaInteract {
  constructor(...args) {
    super(...args);
    this.helper = this.helper.bind(this);
    this._hover = this._hover.bind(this);
    this._mouseenter = this._mouseenter.bind(this);
    this._mouseleave = this._mouseleave.bind(this);
    this._onmouseover = this._onmouseover.bind(this);
    this._dragStart = this._dragStart.bind(this);
    this._dragging = this._dragging.bind(this);
    this._dragStop = this._dragStop.bind(this);
    this.dispatchUiEvent = this.dispatchUiEvent.bind(this);

  }

  /**
   * 
   * @param {*} opt 
   */
  initialize(opt) {
    super.initialize(opt);
    this.viewOnly = false;
    this.model.atLeast({
      state: 0,
      aspect: _a.grid,
      justify: _a.none,
      signal: _e.ui.event,
      bubble: 0,
      filename: LOCALE.PROCESSING
    });
    this.iconType = localStorage.iconType || _a.vignette; //_a.vector

    if ((this.mget(_a.serial) != null) && (this.mget(_a.serial) < 1000)) {
      this.mset({
        state: 1
      });
    }

    this._timer = {}

    this.declareHandlers();
    this.initData();


    this._responsive = () => {
      return this.initBounds();
    };


    let change_tag = this.metadata().change_tag;
    this.mset({ changeTag: change_tag });

    //this.contextmenuSkeleton = require('builtins/contextmenu/skeleton');
  }

  // ===========================================================
  //
  // ===========================================================
  onBeforeDestroy() {
    //this.unbindEvent(_a.live);
  }


  /**
 * 
 * @param {*} delay 
 */
  initBounds(delay) {
    let ox, oy;
    //if (delay == null) { delay = 700; }
    const o = this.$el.offset();
    try {
      ox = this.getLogicalParent().getOffsetX();
      oy = this.getLogicalParent().getOffsetY();
    } catch (error) {
      ox = 0;
      oy = 0;
    }
    this.self = null;
    this.left = null;
    this.right = null;
    this.over = null;
    this.bbox = new Rectangle(o.left + ox, o.top + oy, this.$el.width(), this.$el.height());
  }


  /**
 * 
 * @param {*} reason 
 * @param {*} timeout 
 */
  moveForbiden(reason, timeout) {
    const d = document.getElementById(this._id + '-forbiden');
    //this.debug("AAA:34", d);
    _.delay(this.moveAllowed.bind(this), Visitor.timeout());
    if (d) {
      return;
    }
    this.el.dataset.raised = 1;
    this.content.$el.prepend(require('./template/forbiden')(this, reason));
  }

  /**
   * 
   */
  moveAllowed() {
    const d = document.getElementById(this._id + '-forbiden');
    this.el.dataset.raised = 0;
    if (d != null) {
      d.remove();
    }
  }

  /**
   * 
   */
  helper() {
    return require('./template/helper')(this);
  }


  /**
   * 
   * @param {*} ui 
   */
  initHelper(ui) {
    let rlPOS = -15;
    let zPOS = 50;
    ui.helper.empty();
    ui.helper.moving = this;
    this.ui = ui;
    const make_helper = (sibling) => {
      sibling.el.dataset.drag = _a.on;
      zPOS = zPOS - 1;
      const helper = sibling.$el.clone();
      helper.moving = sibling;
      rlPOS = rlPOS - 5;
      helper.css({
        position: _a.absolute,
        left: rlPOS,
        top: rlPOS,
        zIndex: zPOS,
        margin: 0,
        opacity: 1,
        width: _K.size.full,
        height: _K.size.full
      });
      return helper;
    }
    let leader = make_helper(this);
    this.debug("AAAA:95", ui.helper, leader);
    leader.css({ zIndex: zPOS + 10 });
    this.$el.addClass('leader');
    ui.helper.append(leader);
    //$(_a.body).append(ui.helper.clone()); -- debug 
    const selected = Wm.getGlobalSelection();
    if (!selected.length) {
      return;
    }
    let t = require('./template/files-count')(this, selected.length);
    leader.append(t);
    let i = 0;
    let n = 5;
    //ui.helper.replaceWith(leader);
    //ui.helper.empty();
    this.el.dataset.drag = 'leader';
    while (i < n && selected[i] != null) {
      if (selected[i] !== this) {
        //this.debug("ZZZZZAAAAAA 247", selected[i].cid, this.cid);
        ui.helper.append(make_helper(selected[i]));
      }
      i++;
    }
  }

  /**
   * 
   * @param {*} e 
   * @param {*} ui 
   */
  _dragStart(e, ui) {
    if (!this.allowedAction()) {
      this.moveForbiden(LOCALE.FORBIDEN_MOVE);
      this.disabled = true;
      return;
    }
    window.mouseDragged = true;
    this.el.dataset.drag = _a.on;
    this.initBounds();
    this.initHelper(ui);
  }


  /**
   * 
   * @param {*} e 
   * @param {*} ui 
   */
  _dragging(e, ui) {
    //this.debug("AAA:156", ui.position, this._dragOffsetX, this._dragOffsetY);
    // ui.position.left = ui.position.left + this._dragOffsetX;
    // ui.position.top = ui.position.top + this._dragOffsetY;

    if (!this.allowedAction()) {
      return;
    }
    this.selected = {};
    if (this.disabled) {
      return;
    }
    this.rectangle = new Rectangle(
      ui.offset.left, ui.offset.top, ui.helper.width() * 0.7, ui.helper.height() * 0.7
    );
    this.selfOverlapped = this.bbox.intersection(this.rectangle);
    Wm.capture(this);
  }

  /**
   * 
   * @param {*} e 
   * @param {*} ui 
   */
  _dragStop(e, ui) {
    if (this.isHoveringBin) {
      return;
    }

    e.stopPropagation();
    e.stopImmediatePropagation();
    //@moved = @_moved(ui)
    if (!this.allowedAction()) {
      this.moveAllowed();
      this.disabled = false;

      return;
    }
    this.el.dataset.drag = _a.off;
    const selected = Wm.getGlobalSelection();
    if (selected.length > 1) {
      for (let obj of Array.from(selected)) {
        obj.el.dataset.drag = _a.off;
      }
    }
    //@delaySelect(_a.off)
    this.content.el.dataset.icontype = this.iconType;
    if (!Wm.insert(this) && this.over) {
      //this.debug("FFFFFFFEE", this.intersect(this.over));
      this.over.moveIn(this);
    }
    this.initBounds();
    //Selector.enable()
    window.mouseDragged = true;

    return true;
  }

  /**
   * 
   * @param {*} delay 
   */
  initBounds(delay) {
    let ox, oy;
    //if (delay == null) { delay = 700; }
    const o = this.$el.offset();
    try {
      ox = this.getLogicalParent().getOffsetX();
      oy = this.getLogicalParent().getOffsetY();
    } catch (error) {
      ox = 0;
      oy = 0;
    }
    this.self = null;
    this.left = null;
    this.right = null;
    this.over = null;
    this.bbox = new Rectangle(o.left + ox, o.top + oy, this.$el.width(), this.$el.height());
  }

  /**
   * 
   * @param {*} ui 
   * @param {*} event 
   */
  contextmenuItems() {
    let items = [_a.copy, _a.rename, _a.upload, _a.download, _a.separator, _a.export, _a.import, _a.separator, _a.link];

    if (this.isLocked()) {
      items = [_a.copy, _a.upload, _a.download, _a.separator, _a.export, _a.import, _a.separator, _a.link];
    }

    //this.debug("AAA:125", fileType, items);
    return items;
  }

  /**
   * 
   * @param {*} e 
   * @returns 
   */
  dispatchUiEvent(e) {
    const service = this.el.getService(e); //e.target.dataset.service
    if (service != 'tick') {
      let delay = 1000;
      if (this.mget(_a.filetype) === _a.document) delay = 5000;
      if (this._isWaiting || (Utils.timestamp() - this._clickTimestap) < delay) return;
    }
    this._clickTimestap = Utils.timestamp();
    this.debug(`Media interact: dispatchUiEvent svc=${service}`, e, e.type, this, e.target);
    switch (service) {

      case 'tick':
        this.tick(e);
        break;

      default:
        this.defaultTrigger(e);
    }

    return false;
  }




  /**
   * 
   * @returns 
   */
  _getKind() {
    if ((this.mget(_a.mode) === _a.row) || (this.getLogicalParent().viewMode === _a.row)) {
      return VIEW_ROW;
    }
    return VIEW_GRID;
  }


  /**
   * 
   * @param {*} e 
   * @param {*} ui 
   */
  allowedAction() {
    if (this.mget(_a.isalink)) return true;
    if (this.isGranted(_K.permission.write)) {
      return true;
    } else {
      if (this.mget(_a.type) == _a.hub) {
        return this.getLogicalParent().isGranted(_K.permission.modify);
      }
    }
    if (this.getLogicalParent().isGranted(_K.permission.modify)) return true;
    return false;
  }

  // ===========================================================
  //
  // ===========================================================
  getLogicalParent() {
    if (this._lp) {
      return this._lp;
    }
    let p = this.parent;
    while (p) {
      if (p.acceptMedia) {
        this._lp = p;
        return p;
      }
      p = p.parent;
    }
    this._lp = Wm;
    return Wm;
  }

  /**
   * 
   * @param {*} item 
   */
  intersect(item) {
    const mbox = item.bbox;
    if ((mbox == null)) {
      return 0;
    }
    let r = this.rectangle || this.bbox;
    const i = mbox.intersection(r);
    if ((i == null)) {
      return 0;
    }
    return (i.area() / r.area());
  }


  /**
   * 
   * @param {*} e 
   * @param {*} ui 
   */
  overlaps(r) {
    // let r0 = new Rectangle(
    //   this.$el.offset().left, 
    //   this.$el.offset().top,
    //   this.$el.width(),
    //   this.$el.height()
    // )
    const i = this.bbox.intersection(r);
    //const i = r0.intersection(r);
    if ((i == null)) {
      return 0;
    }
    return (i.area() / this.bbox.area());
  }

  // ===========================================================
  //
  // ===========================================================
  delaySelect(side) {
    const f = () => {
      clearTimeout(this._timer.select)
      this.shift(side);
    };
    this._timer.select = _.delay(f, 200);
  }

  // ===========================================================
  //
  // ===========================================================
  index() {
    return this.mget(_a.rank);
  }

  // ===========================================================
  //
  // ===========================================================
  toggleStatus() {
    let status;
    if (this.mget(_a.status) === _a.active) {
      status = _a.idle;
    } else {
      status = _a.active;
    }
    return this.postService({
      service: _SVC.media.update_status,
      nid: this.mget(_a.nid),
      status,
      hub_id: this.mget(_a.hub_id)
    });
  }

  // ===========================================================
  //
  // ===========================================================
  _getDefaultDest() {
    let dest = this.mget(_a.destination);
    if (_.isEmpty(dest)) {
      let nid;
      if (this.isHub) {
        nid = this.mget(_a.actual_home_id);
      } else {
        nid = this.mget(_a.nid);
      }
      dest = {
        nid,
        hub_id: this.mget(_a.hub_id)
      };
    }
    return dest;
  }



  // ===========================================================
  //
  // ===========================================================
  wait(state, timeout) {
    if (state) {
      this._chrono = Utils.timestamp();
    }

    this.spinner(state, timeout);
    this._isWaiting = state;
  }

  // ===========================================================
  //
  // ===========================================================
  onPartReady(child, pn) {
    switch (pn) {
      case _a.content:
        this.content = child;
        return child.once(_e.show, () => {
          this.setupInteract();
          this._mouseleave();
          child.el.dataset.status = this.mget(_a.status);
        });

      case _a.entry:
        if (child.mget(_a.service) === _e.rename) {
          this.el.dataset.status = _e.rename;
        }
        this.entry = child;
        child.on(_e.show, () => {
          _.delay(child.select.bind(child), 1000);
        });
        child.once(_e.destroy, () => {
          this.el.dataset.status = '';
          this._renameOnStart = null;
          this.phase = null;
        });
        return RADIO_CLICK.once(_e.reset, this.restart);
    }
  }

  /**
   * 
   * @param {*} origin
   */
  restart(origin) {
    this.trigger(_e.restart);
    this.onDomRefresh();
    this.status = null;
    this.unselect()
  }


  // ===========================================================
  //
  // ===========================================================
  unselect() {
    this.resetMotion();
    if (!this.get(_a.state) && !this._renaming) return;
    this.model.unset('handSelect');
    this.setState(0);
    this.el.dataset.selected = this.mget(_a.state);
    this.el.dataset.phase = "";
    // @el.dataset.over = _a.off 
    this.overed(_a.off);
    this._changeState('checkbox', 'selected', this.mget(_a.state));
    const status = this.status || this.mget(_a.status);

    if (this.entry && !this.entry.isDestroyed()) {
      this.requestRename();
    }
    //@collection.remove @entry.model 
    try {
      if (this.children.last().mget(_a.sys_pn) === 'contextmenu') {
        this.collection.pop();
      }
    } catch (error) { }

    this.trigger(_e.unselect);
  }

  // ===========================================================
  //
  // ===========================================================
  select(opt, hide) {
    this.setState(1);
    this.el.dataset.selected = this.mget(_a.state);
    return this.mset(opt);
  }

  // ===========================================================
  //
  // ===========================================================
  addPlayer(player) {
    if (!player) {
      return;
    }
    this.el.dataset.opened = 1;
    this._players = this._players || {};
    this._players[player.cid] = 1;
    player.once(_e.destroy, () => {
      delete this._players[player.cid];
      if (_.isEmpty(this._players)) {
        this.el.dataset.opened = 0;
        this.unselect();
      }
    });
  }



  /**
   * 
   * @returns 
   */
  imgCapable() {
    return 0;
  }


  /**
   * 
   * @returns 
   */
  waitPreview(cb, args) {
  }



  // ===========================================================
  //
  // ===========================================================
  lock() {
    let status;
    if (this.mget(_a.status) === _a.locked) {
      status = _a.active;
    } else {
      status = _a.locked;
    }
    let hubId = this.mget(_a.hub_id);
    if (this.mget(_a.filetype) === _a.hub) {
      return;
    }
    return this.postService({
      service: _SVC.media.update_status,
      nid: this.mget(_a.nid),
      status,
      hub_id: hubId
    });
  }

  /**
   * To check the media is locked 
   * @returns bool
   */
  isLocked() {
    return (this.mget(_a.status) === _a.locked);
  }

  // ===========================================================
  // delete
  //
  // ===========================================================
  delete(single_node = 1, trashbin) {
    let f, msg;
    let granted = this.isGranted(_K.permission.delete);
    let name = '';
    if (this.mget(_a.filetype) === _a.hub) {
      if (this.mget(_a.area) == _a.private) {
        name = LOCALE.TEAM_ROOM
      } else {
        name = LOCALE.SHAREBOX
      }
      this.triggerHandlers({
        service: "open-manager",
        message: name.printf(LOCALE.USE_MANAGER_TO_DELETE)
      });
      this.moveForbiden(LOCALE.ACTION_NOT_PERMITTED);
      return null;
    }
    if (this.containsHub) {
      this.triggerHandlers({
        service: "no-trash-hubs",
        message: LOCALE.CONTAINS_NON_DELETABLE
      });
      this.moveForbiden(LOCALE.ACTION_NOT_PERMITTED);
      return null;
    }

    if (this.mget(_a.status) === _a.locked) {
      granted = false;
      msg = LOCALE.FILE_NOT_DISPOSABLE;
    }
    if (!granted) {
      msg = msg || LOCALE.FORBIDEN_DELETE;
      this.moveForbiden(msg);
      this.anim([0.3, { scale: 0.9, alpha: 0.7 }], [0.3, { scale: 1, alpha: 1 }]);
      f = () => {
        this.moveAllowed();
      };
      _.delay(f, Visitor.timeout());
      return null;
    }

    if (!granted) {
      return null;
    }

    const bo = Wm.$el.offset();

    const helper = this.$el.clone(); //this.helper();
    helper.removeAttr('class');
    helper.addClass(`deleting ${this.fig.family}__helper-wrapper`);
    const pos = this.$el.offset();
    helper.css({
      position: _a.absolute,
      left: Utils.px((pos.left - bo.left)),
      top: Utils.px((pos.top - bo.top)),
      'z-index': 200002
    }); // Must be hight than modal popup

    Wm.$el.append(helper);

    f = () => {
      const tl = new TimelineMax();
      tl.to(trashbin, 0.3, { scale: 1.2 }).to(trashbin, 0.3, { scale: 1 });
      trashbin.parent().children(".temp-anim").remove();
      helper.remove();
      if (this.mget(_a.status) === SEEDING) {
        this.suppress();
        return;
      }
      if (single_node) {
        this.postService(this.makeTrashOptions());
      }
    };

    const dest_x = trashbin.offset().left;
    const dest_y = trashbin.offset().top;
    //this.debug("ZZZZZZZ 1252", dest_x, trashbin, lastClick.clientX, lastClick.screenX)
    TweenLite.to(helper, 1.4, {
      left: dest_x,
      top: dest_y,
      scale: 0,
      alpha: 0,
      onComplete: f
    });
  }



  // ===========================================================
  //
  // ===========================================================
  onDomRefresh() {
    this.mset(_a.bubble, 0);
    this.el.dataset.role = _a.root;
    this.el.onmouseenter = this._mouseenter;
    this.el.onmouseleave = this._mouseleave;
    this.el.onmouseover = this._onmouseover;

    this.el.onclick = this.dispatchUiEvent;
    this.service = _a.idle;

    if ((this.mget(_a.uiHandler) == null)) {
      this.mset({
        uiHandler: [this.getLogicalParent()]
      });
    }
    let hub = 0;
    this.feed(Skeletons.Box.X({
      className: `${this.fig.family}__container ${this.mget(_a.filetype)}`,
      sys_pn: _a.content,
      active: 0,
      dataset: {
        hub
      }
    }));
    this.el.dataset.selected = this.mget(_a.state);

    this.parent.off(_e.scroll, this.initBounds.bind(this));
    this.parent.on(_e.scroll, this.initBounds.bind(this));
  }

  /**
   * 
   */
  defaultTrigger(e) {
    this.service = this.mget(_a.service) || OPEN_NODE;
    this.model.set(_a.state, 0);
    this.el.dataset.selected = 0;
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.service = this.service;
    this.triggerHandlers(e);
  }


  /**
   * 
   */
  _setupInteract() {
    const opt = {
      distance: 5,
      cursorAt: this.cursorPosition,
      start: this._dragStart,
      drag: this._dragging,
      stop: this._dragStop,
      opacity: 0.7,
      helper: this.helper,
      handle: `.${this.fig.family}__container`,
      containment: [0, 40, window.innerWidth, window.innerHeight - 40], //Desk.$el
      appendTo: _a.body, // Desk.$el #
      scroll: false
    };
    const k = () => {
      this.$el.draggable(opt);
      this.initBounds();
    };
    Utils.waitForEl(this.el, k);

    this.logicalParent = this.mget('logicalParent') || this.getLogicalParent();

    const mimetype = this.mget(_a.mimetype);
    if ((mimetype != null) && this.mget(_a.mimetype).match(/^audio/)) {
      this.model.set(_a.filetype, _a.audio);
    }

    this.content.el.dataset.capability = this.imgCapable();
    if (this._oldType != null) {
      this.$el.removeClass(this._oldType);
    }
    this.$el.addClass(this.mget(_a.filetype));
    this.$el.addClass(this.mget(_a.area));
    this._oldType = this.mget(_a.filetype);


    const tt_id = this._id + '-filename';
    Utils.waitForEl(tt_id, () => {
      this._longName = document.getElementById(tt_id);
      this._longName.onmouseenter = (e) => {
        if (e.buttons) return;
        //this.debug("HHHHHHHHHHHHHHH", e.buttons);
        this._filenameHover(_a.on, e);
      }
      this._longName.onmouseleave = (e) => {
        clearTimeout(this._timer.filename);
        this._filenameHover(_a.off, e);
      }
    });
  }

  /**
   * 
   */
  _mobileInteract() {
    thiw.warn("MOBILE INTERACT : TBD");
  }

  /**
   * 
   */
  loadImage(drumate_id) {
    const img = new window.Image();
    let url = Visitor.avatar(drumate_id, _a.vignette);
    //this.debug("AAA:854", url);
    img.onerror = (e) => {
      this.mset({ imgCapable: 0 })
      this._error = true;
      //this.debug("AAA: ERRO 22 ", this.mget(_a.firstnme), e.type, e, (e.type == _a.load));
      this.content.el.innerHTML = this.innerContent(this);
      this._setupInteract();
      this.trigger('content-ready');
    };
    img.onload = e => {
      if (this._loaded || this._error) return;
      this._loaded = true;
      //this.debug("AAA:LOAD", this.mget(_a.firstnme), e.type, e, (e.type == _a.load));
      setTimeout(() => {
        if (this._error) return;
        this.mset({ imgCapable: 1 })
        this.content.el.innerHTML = this.innerContent(this);
        this._setupInteract();
        this.trigger('content-ready');
      }, 200)
    };
    img.load(url);
  }

  // ===========================================================
  //
  // ===========================================================
  setupInteract() {
    let filetype = this.mget(_a.filetype);
    let drumate_id = this.mget('drumate_id');
    if (drumate_id) {
      this.loadImage(drumate_id);
      return;
    }
    this.content.el.innerHTML = this.innerContent(this);
    this._setupInteract();
    this.trigger('content-ready');
  }

  // /**
  //  * 
  //  */
  // preload(){
  //   return new Promise((resolve, reject)=>{
  //     setTimeout(()=>{
  //       resolve(require('./template/preload')())
  //     }, 1000);
  //   })
  // }

  // ===========================================================
  //
  // ===========================================================
  moved(ui) {
    const dx = Math.abs(ui.originalPosition.left - ui.position.left);
    const dy = Math.abs(ui.originalPosition.top - ui.position.top);
    if ((dx < 175) && (dy < 50)) {
      return false;
    }
    return true;
  }


  /**
   * 
   */
  unselect() {
    if (!this.get(_a.state) && !this._renaming) return;
    //this.debug("AAA:506", this.get(_a.state));
    //console.trace()
    this.model.unset('handSelect');
    this.setState(0);
    this.el.dataset.selected = this.mget(_a.state);
    this.el.dataset.phase = "";
    // @el.dataset.over = _a.off 
    this.overed(_a.off);
    this._changeState('checkbox', 'selected', this.mget(_a.state));
    const status = this.status || this.mget(_a.status);
    switch (status) {
      case _e.rename:
        this.requestRename();
        return;
    }

    if (this.entry && !this.entry.isDestroyed()) {
      this.requestRename();
    }
    //@collection.remove @entry.model 
    try {
      if (this.children.last().mget(_a.sys_pn) === 'contextmenu') {
        this.collection.pop();
      }
    } catch (error) { }

    this.trigger(_e.unselect);
  }

  // ===========================================================
  //
  // ===========================================================
  select(opt, hide) {
    this.setState(1);
    this.el.dataset.selected = this.mget(_a.state);
    return this.mset(opt);
  }




  /**
   * @param {Letc} cmd
   * @param {Object} args
  */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.service || cmd.mget(_a.service);
    this.debug(`AAA:641 service=${service}`, cmd, args)
  }



  /**
   * hover without media, only mouse
   * @param {*} state 
   */
  _filenameHover(state, e) {
    if (this.get(_a.state)) return;
    //if (this.isGranted(_K.permission.modify)) {
    this._changeState(_a.filename, _a.hover, state);
    //}
    if (state == _a.on) {
      this._timer.filename = _.delay(() => {
        if (this._renaming) return;
        this._changeState(_a.tooltips, _a.hover, state);
      }, Visitor.timeout(800));
    } else {
      this._changeState(_a.tooltips, _a.hover, state);
    }

  }

  /**
   * hover without media, only mouse
   * @param {*} state 
   */
  _hover(state, e) {
    if (!e) return;
    this.el.dataset.hover = state;
    this.content.el.dataset.hover = state;
    this._changeState('checkbox', _a.hover, state);
    this._changeState('remove', _a.hover, state);
    this._changeState('share', _a.hover, state);
    this._changeState('access', _a.hover, state);
    this._changeState('info', _a.hover, state);
    if (state == _a.off) {
      this._changeState(_a.tooltips, _a.hover, state);
    } else {
      Wm.showLocationTooltips(this);
    }

  }

  /**
   * overed with another media
   * @param {*} state 
   */
  overed(state, moving) {
    if (moving) {
      moving.over = this;
      if (state !== _a.over) moving.over = null;
    }
    if (state !== _a.over) this.over = null;
    this.el.dataset.over = state;
    this.content.el.dataset.over = state;
  }

  /**
   * 
   * @param {*} e 
   * @returns 
   */
  _mouseenter(e) {
    if (e.buttons) return;
    const f = () => {
      this._hover(_a.on, e);
      this.enablePreview(true);
    };
    this._timer.hover = _.delay(f, 200);
  }

  /**
   * 
   * @param {*} e 
   * @returns 
   */
  _mouseleave(e) {
    this.iconType = localStorage.iconType;
    this.content.el.dataset.icontype = this.iconType;
    clearTimeout(this._timer.hover);
    this._hover(_a.off, e);
    if (!this.imgCapable() || (this.get(_a.filetype) === _a.hub)) {
      this.iconType = _a.vector;
      this.content.el.dataset.icontype = this.iconType;
    }
  }

  /**
   * 
   * @param {*} e 
   * @returns 
   */
  _onmouseover (e){
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    return false;
  }

  // ===========================================================
  //
  // ===========================================================
  _poke() {
    return this.anim([0.3, { scale: 1.2 }], [0.3, { scale: 1 }]);
  }

  //===========================================================
  //
  //===========================================================
  isHandSelect() {
    return this.mget('handSelect');
  }


  // ===========================================================
  //
  // ===========================================================
  tick(e) {
    this.status = _a.idle;
    this.model.set(_a.state, 1 ^ Utils.toggleState(this.mget(_a.state)));
    const state = this.mget(_a.state);
    this.el.dataset.selected = state;

    if (state) {
      this.service = _e.select;
      this.mset({
        handSelect: e.ctrlKey
      });
    } else {
      this.service = _e.unselect;
      this.model.unset('handSelect');
      this.trigger(_e.unselect);
    }

    this.el.dataset.sharing = _a.off;
    this._changeState('checkbox', 'selected', state);
    //this.triggerHandlers({service:_e.select});
    RADIO_BROADCAST.trigger(_e.select, this);
    return
  }


  /**
   * 
   * @param {*} name 
   * @param {*} attr 
   * @param {*} value 
   */
  _changeState(name, attr, value) {
    const el = document.getElementById(`${this._id}-${name}`);
    if (el != null) {
      el.dataset[attr] = value;
    }
  }


  /**
   * 
   * @param {*} method 
   * @param {*} data 
   * @param {*} socket 
   */
  __dispatchRest(method, data, socket) {
    this.debug("AAA:1960", method, data, socket, this);
  }


}


module.exports = __thumbnail_core;

