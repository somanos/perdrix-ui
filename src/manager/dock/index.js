/* ==================================================================== *
*   Copyright Xialia.com  2011-2020
*   FILE : /home/somanos/devel/ui/letc/template/index.coffee
*   TYPE : Component
* ==================================================================== */

//#########################################

class __perdrix_dock extends LetcBox {

  constructor(...args) {
    super(...args);
    this.moveForbiden = this.moveForbiden.bind(this);
    this.moveAllowed = this.moveAllowed.bind(this);
    this.mediaDropOnBin = this.mediaDropOnBin.bind(this);
    this.mediaDragOverBin = this.mediaDragOverBin.bind(this);
    this.mediaDragLeaveBin = this.mediaDragLeaveBin.bind(this);
  }

  /**
   * 
   * @param {*} opt 
   */
  initialize(opt = {}) {
    this.fig = 1;
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this._launchOptions = { explicit: 1, singleton: 1 };
    this.contextmenuSkeleton = _a.none;
  }


  /**
   * 
   * @param {*} kind 
   * @param {*} args 
   */
  _createHub(kind, args) {
    const aw = Wm.getActiveWindow();
    if (aw.isHub) {
      aw.warning(LOCALE.NOT_POSSIBLE_NESTING_HUBS);
      return;
    }
    if (this.phase === _a.creating) {
      return;
    }

    Wm.launch({
      kind,
      nid: aw.getCurrentNid(),
      service: "new-hub",
      uiHandler: aw
    }, {
      explicit: 1, singleton: 1
    });
  }


  /**
   * 
   */
  onChildBubble() {

  }

  /**
   * 
   * @param {*} e 
   * @param {*} ui 
   */
  mediaDragOverBin(e, ui) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.debug("FSSFSFSF", e, ui);
    const m = ui.helper.moving;
    if ((m == null)) {
      return;
    }
    m.isHoveringBin = true;
    if (m.containsHub) {
      //this.moveForbiden(LOCALE.ACTION_NOT_PERMITTED);
      this.moveForbiden(LOCALE.USE_MANAGER_TO_DELETE);
      ui.helper.moving.valid = false;
      return;
    }

    if (m.mget(_a.status) === _a.locked) {
      ui.helper.moving.valid = false;
      this.moveForbiden();
      return;
    }

    if (!m.isGranted(_K.permission.delete)) {
      ui.helper.moving.valid = false;
      this.moveForbiden(LOCALE.WEAK_PRIVILEGE);
      return;
    }

    ui.helper.moving.valid = true;
    m.moveAllowed();
    this.__trashBin.el.dataset.over = _a.yes;
  }


  // ==================
  //
  // ==================
  moveForbiden(reason) {
    const d = document.getElementById(this._id + '-forbiden');
    //setTimeout(this.moveAllowed.bind(this), Visitor.timeout());
    if (d != null) {
      return;
    }
    const m = reason || LOCALE.FILE_NOT_DISPOSABLE;
    //this.__trashBin.$el.prepend(require('builtins/media/template/forbiden')(this, m));
  }

  // ==================
  //
  // ==================
  moveAllowed() {
    const d = document.getElementById(this._id + '-forbiden');
    if (Visitor.parseModuleArgs().timeout) {
      return;
    }
    if (d != null) {
      return d.remove();
    }
  }

  /**
   * 
   * @param {*} e 
   * @param {*} ui 
   */
  mediaDropOnBin(e, ui) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.target.dataset.over = _a.no;
    const { moving } = ui.helper;
    if ((moving == null)) {
      return;
    }
    moving.isHoveringBin = true;
    if (!moving.valid) {
      this.moveAllowed();
      moving.valid = true;
      return;
    }
    const selected = Wm.getGlobalSelection();
    if (moving.mget(_a.filetype) === _a.hub) {
      return;
    }
    if (!_.isEmpty(selected)) {
      this.putIntoTrash(selected);
      return;
    }
    //Wm.trash ui.helper.moving
    moving.putIntoTrash();
  }

  /**
   * 
   * @param {*} e 
   * @param {*} ui 
   */
  mediaDragLeaveBin(e, ui) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.__trashBin.el.dataset.over = _a.no;
    const { moving } = ui.helper;
    this.moveAllowed();
    if ((moving == null)) {
      return;
    }
    moving.isHoveringBin = false;
    return moving.valid = true;
  }



  /**
   * 
   * @param {*} child 
   * @param {*} pn 
   */
  onPartReady(child, pn) {
    //this.debug(`aaa 249 pn=${pn} XXX`, child);
    switch (pn) {
      case "trash-bin":
        this.ensureElement(child.el, () => {
          child.$el.droppable({
            tolerance: "touch",
            over: this.mediaDragOverBin,
            out: this.mediaDragLeaveBin,
            drop: this.mediaDropOnBin,
            greedy: true
          });
        });
        break;
      case 'dock-container':
        this.ensureElement(child.el, () => {
          child.$el.mouseover(() => {
            child.parent.$el.css("z-index", "100000");
          });
          child.$el.mouseout(() => {
            child.parent.$el.css("z-index", "10000");
          });
        })
    }
  }


  /**
 * 
 * @param {*} list  -- List of nodes 
 */
  putIntoTrash(list) {
    let nodes = [];
    if (list.length == 1) {
      list[0].delete(1, this.__trashBin.$el);
      return
    }
    for (var n of list) {
      if (n.mget(_a.filetype) == _a.hub) {
        n.unselect();
        n.moveForbiden(LOCALE.ACTION_NOT_PERMITTED);
        continue;
      }
      nodes.push({
        nid: n.mget(_a.nodeId),
        hub_id: n.mget(_a.hub_id),
        parent_id: n.mget(_a.parent_id),
      })
    }
    if (_.isEmpty(nodes)) return;
    // Only to use animation
    list[0].delete(0, this.__trashBin.$el);
    this.postService({
      service: _SVC.media.trash,
      nodes,
      hub_id: nodes[0].hub_id
    }).then((data) => {
      for (var i of data) {
        let f = _.filter(list, function (e) {
          return (e.mget(_a.nid) == i.nid && e.mget(_a.hub_id) == i.hub_id)
        })
        if (!_.isEmpty(f)) {
          f[0].delete(1, this.__trashBin.$el);
          // f[0].suppress();
        }
      }
    })
  }

  /**
   * 
   * @param {*} cmd 
   */
  trash(cmd) {
    //let a = Wm.getGlobalSelection();
    // Sm : Share Manager (share-box)
    // if ((typeof Sm !== 'undefined' && Sm !== null) && !Sm.isDestroyed()) {
    //   list = a.concat(Sm.getLocalSelection());
    // }
    let list = [];
    let forbiden = 0;
    let hub = 0;
    for (var n of Wm.getGlobalSelection()) {
      if (n.mget(_a.privilege) & _K.permission.delete) {
        if (n.mget(_a.filetype) == _a.hub) {
          hub++;
          n.unselect();
          n.moveForbiden(LOCALE.ACTION_NOT_PERMITTED);
          continue;
        }
        list.push(n);
      } else {
        forbiden++;
        n.unselect();
        n.moveForbiden(LOCALE.WEAK_PRIVILEGE);
      }
    }

    if (hub) {
      Wm.openManager(this, {
        service: "open-manager",
        message: LOCALE.USE_MANAGER_TO_DELETE
      })
    }

    if (_.isEmpty(list) && (!forbiden && !hub)) {
      const old = Wm.getItemByKind('window_trash');
      if ((old != null) && !old.isDestroyed()) {
        old.goodbye();
        return;
      }
      const item = {
        kind: 'window_trash',
        service: "open-node",
        trigger: cmd,
        uiHandler: [this]
      };
      return Wm.windowsLayer.append(item);
    } else {
      return this.putIntoTrash(list);
    }
  }

  /**
   * 
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
  }


  /**
   * 
   * @param {*} cmd 
   * @param {*} args 
   */
  onUiEvent(cmd, args) {
    const service = cmd.service || cmd.mget(_a.service) || cmd.mget(_a.name);
    this.debug(`AAA:328 menuEvents service=${service}`, cmd, this);
    switch (service) {
      case 'add-website': case 'add-team': case 'add-sharebox':
        return this._createHub(cmd.mget(_a.respawn));

      case 'add-folder':
        return Wm.addFolder(cmd);

      case 'add-note':
        let c = Wm.windowsLayer.append({
          kind: 'editor_note',
          maiden: 1
        });
        return c;

      case 'address-book':
        const route = cmd.mget(_a.route);
        this.__addressbookLauncher.el.dataset.isActive = _a.on
        Wm.launch({
          kind: 'window_addressbook',
          args: route,
          source: this.__addressbookLauncher
        }, this._launchOptions);
        return

      case 'contact-card':
      case 'calendar':
        return Wm.openContent(cmd);

      case "showInvite-notifications":
        this.debug("desk UI showInvite-notifications");
        return Wm.openContent(cmd);


      case _e.trash:
        return this.trash(cmd);

      case `video-help`:
        Wm.playTutorial(cmd.mget(_a.name));
        return;

      case _e.launch:
        if (cmd.mget('exclude')) {
          let e = Wm.getItemByKind(cmd.mget('exclude'));
          if (e && !e.isDestroyed()) {
            e.raise();
            return;
          }
        }
        cmd.el.dataset.isActive = _a.on;
        return Wm.launch({ kind: cmd.mget(_a.respawn), source: cmd }, this._launchOptions);
    }
  }

  /* ===========================================================
   *
   * ===========================================================*/
  __dispatchPush(service, data, socket) {
    switch (service) {
      case _SVC.no_service:
        this.debug("Created by kind builder", service, data)
    }
  }

  /* ===========================================================
   *
   * ===========================================================*/
  __dispatchRest(service, data, socket) {
    switch (service) {
      case _SVC.no_service:
        this.debug("Created by kind builder", service, data)
    }
  }
}

module.exports = __perdrix_dock
