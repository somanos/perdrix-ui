
require('./skin');
// const Leaflet = require('leaflet');
// require('leaflet/dist/leaflet.css');

function px(v){
  return `${v}px`
}

class __perdrix_manager extends DrumeeWm {
  constructor(...args) {
    super(...args);
    this.capture = this.capture.bind(this);
    this._upload = this._upload.bind(this);
    this.reorder = this.reorder.bind(this);
    this.onPartReady = this.onPartReady.bind(this);
    this.getLocalSelection = this.getLocalSelection.bind(this);
    this._getViewerPosition = this._getViewerPosition.bind(this);
    this.onDomRefresh = this.onDomRefresh.bind(this);
    this.onUiEvent = this.onUiEvent.bind(this);
    this._displayContent = this._displayContent.bind(this);
    this._onmouseover = this._onmouseover.bind(this);
  }

  static initClass() {
    this.prototype.fig = 1;
    this.prototype.events = {
      drop: '_upload',
      dragenter: 'fileDragEnter',
      dragover: 'fileDragOver'
    };
  }

  /**
   * 
   * @param {*} opt 
   */
  initialize(opt) {
    window.Wm = this;
    super.initialize(opt);
    this.offsetY = 0;
    this.declareHandlers();
    this.offsetHeight = 230;
    this.isApplication = true;
    this._launchOptions = { explicit: 1, singleton: 1 };
  }


  /**
   * 
   * @returns 
   */
  resetSearch() {
    return (this.searchBar != null ? this.searchBar.setValue('') : undefined);
  }

  /**
   * 
   * @param {*} source 
   * @param {*} args 
   * @returns 
   */
  search(source, args) {
    this.finderSource = source;
    let kind = 'window_finder';
    const w = this.getItemByKind(kind);
    if (!w || w.isDestroyed()) {
      const string = source.getValue(1);
      let { top, left } = source.$el.offset();
      const item = {
        kind,
        string,
        trigger: source,
        uiHandler: [source],
        // style: {
        //   top: top + source.$el.height(),
        //   left,
        // }
      };
      this.windowsLayer.append(item);
      return
    }
    if (!source) {
      w.hide();
    } else {
      w.search(source, args);
    }
  }
  /**
   * 
   * @param {*} m 
   * @returns 
   */
  capture(m) {
    if (!m) return
    if (!m.isPseudo) {
      this.warn("Accept only pseudo media!", m);
      return;
    }
    const t = this.selectWindow(m);
    if (!t) {
      return;
    }
    return this._target = t.seek_insertion(m);
  }

  /**
   * 
   */
  showLocationTooltips(media) {
    let c = this.__movingTooltips;
    this.clearTimer();
    if (this._currentSource) {
      if (this._currentSource.cid !== media.cid) {
        this.closeTooltips();
        this._sameSource = 0;
      } else if (c.el.dataset.state == 1) {
        //this.debug("AAA:150 RETURN");
        this._sameSource = 1;
        return;
      }
    }
    this._currentSource = media;

    let loc = media.mget(_a.location);
    if (!loc) return;

    for (let k in loc) {
      if (loc[k] == null) {
        loc[k] = '';
      }
    }

    let {
      street_type,
      street_name,
      district,
      postal_code,
      lon,
      lat
    } = loc;
    let line1 = `${street_type} ${street_name}`;
    let mode = '';
    if (/^ +$/.test(line1)) {
      mode = 'single-line';
    } else {
      mode = 'double-line';
    }
    if (lon && lat) {
      mode = 'map';
    }

    this.ensurePart("moving-tooltips").then((c) => {
      let html = require("./thumbnail/template/location")(loc);
      //this.debug("AAA:147", loc, html, c);
      let { left, top } = media.$el.offset();
      c.el.style.left = px(left);
      if (!lon || !lat) {
        if (mode == 'single-line') {
          c.el.style.top = px(top - 53);
        } else {
          c.el.style.top = px(top - 70);
        }
      } else {
        c.el.style.top = px(top - 214);
      }
      c.el.dataset.state = "1";
      c.el.dataset.mode = mode;
      c.el.innerHTML = html;
      // return;
      if (lon && lat) {
        let center = Leaflet.latLng(lon, lat);
        let id = "map-container";
        let map = Leaflet.map(id, {
          center,
          zoom: 14,
        });
        let el = document.getElementById(id);
        el.onmouseenter = (e) => {
          this.debug("AAA:203");
          if (e.buttons) return;
          this._isOverTips = true;
        };
        el.onmouseleave = (e) => {
          this._isOverTips = false;
        };
        const key = 'e6dFgeNUbz8btxLlm3ng';
        Leaflet.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, { //style URL
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
          crossOrigin: true
        }).addTo(map);
        let content = `${district} ${postal_code}`;
        if (street_type || street_name) {
          content = `${street_type} ${street_name}<br />${content}`;
        }
        content = content.replace(/ +\<br *\/\>/, '');
        //this.debug("AAA:197", content);
        Leaflet.tooltip(center, { content, permanent: true }).addTo(map);
      }
    })
  }

  /**
   * 
   */
  insert() { }

  /**
   * 
   * @param {*} e 
   * @returns 
   */
  _upload(e) {
    return this.upload(e, this.mget(_a.token));
  }

  /**
   * 
   * @param {*} m 
   * @returns 
   */
  reorder(m) {
    return this.debug("NO OP ", m);
  }

  /**
   * 
   * @param {*} child 
   * @param {*} pn 
   * @returns 
   */
  onPartReady(child, pn) {
    //this.debug("SOOOOOOOOOOOO 55AAAAAAAAAREADY ", pn, this);
    //const hub_id = this.model.get(_a.hub_id) || this.model.get(_a.holder_id);
    switch (pn) {
      case "browser-wraper":
        return this._content = child;

      case _a.list:
        this.iconsList = child;
        // let {type, version} = license();
        // child.el.dataset.type = type;
        // child.el.dataset.version = version;
        break;

      case "logo-block":
        let logo = `https://${bootstrap().main_domain}` + _K.logo
        child.el.style.backgroundImage = `url(${logo})`;
        return logo

      case 'windows-layer':
        this.windowsLayer = child;
        child.onAddKid = c => {
          c.once(_e.destroy, () => {
            const last = child.children.last();
            if ((last != null) && _.isFunction(last.raise)) {
              return last.raise();
            }
          })
          child.el.style.width = '';
          return child.el.style.height = '';
        }

        child.collection.on(_e.remove, function () { });
        return child.on(_e.show, () => {
          child.append({ kind: 'window_finder' });
          this.trigger("content:ready", child);
        });
      case "moving-tooltips":
        child.el.onmouseenter = (e) => {
          this.debug("AAA:306");
          if (e.buttons) return;
          this._isOverTips = true;
        };
        child.el.onmouseleave = (e) => {
          this._isOverTips = false;
        };
    }
  }

  /**
   * Abstract
   */
  autoMenu() {
  }

  /**
   * 
   */
  getLocalSelection() {
    const f = [];
    this.iconsList.children.each(function (c) {
      if (c.model.get(_a.state)) {
        return f.push(c);
      }
    });
    if (_.isEmpty(f)) return this.iconsList.children.toArray();
    return f;
  }

  /**
   * 
   * @param {*} c 
   */
  _getViewerPosition(c) {
    const width = this.$el.width();
    const height = this.$el.height();
    const p = c.$el.position();
    p.width = _K.docViewer.width; //_K.browser.width
    p.height = _K.docViewer.height; //_K.browser.height
    p.zIndex = 1000 + this.windowsLayer.collection.length;
    if ((p.left + _K.docViewer.width) > width) {
      p.left = width - _K.docViewer.width - 52;
      if (p.left < 0) {
        p.left = 0;
      }
    }
    if ((p.top + _K.docViewer.height) > height) {
      p.top = height - _K.docViewer.height - 52;
      if (p.top < 0) {
        p.top = 0;
      }
    }
    return p;
  }

  /**
   *
  */
  onDomRefresh() {
    //this.debug("AAA:259", this, this.el);
    this.feed(require('./skeleton')(this));
    this.el.onmouseenter = this._mouseenter;
    this.el.onmouseleave = this._mouseleave;
    this._currentTarget;
    this._timeStamp = 0;
    this._currentTips;
    this.el.onmouseover = this._onmouseover;
  }

  /**
   * 
   */
  clearTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  /**
   * 
   */
  closeTooltips() {
    let c = this.__movingTooltips;
    c.el.dataset.state = 0;
    c.el.innerHTML = "";
  }

  /**
   * 
   * @param {*} e 
   */
  _onmouseover(e) {
    let c = this.__movingTooltips;
    let state = c.el.dataset.state;
    if (state == 0) {
      return;
    }
    if (e.target.classList.contains('location-wrapper')) {
      this._isOverTips = true;
      this._currentTips = e.target;
      this.clearTimer();
    } else {
      if (this._isOverTips) {
        this.clearTimer();
      }
      if (!this._currentTips || !this._currentTips.contains(e.target)) {
        this._isOverTips = false;
      }
      if (this._sameSource === 0) {
        return
      }
      this._timer = setTimeout(() => {
        //this.debug("AAA:381 -- STATE  _sameSource WAS OVER",this._sameSource, this._isOverTips, state);
        if (this._sameSource) return;
        if (!this._isOverTips) {
          this.closeTooltips();
        }
      }, 1000);
    }
    this._timeStamp = e.timeStamp;
  }

  /**
   * 
   * @param {*} cmd 
   * @param {*} args 
   * @returns 
   */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.mget(_a.service);
    this.closeTooltips();
    switch (service) {
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
      case _e.search:
        this.search(cmd)
        return;
    }
  }

  /**
   * 
   * @param {*} data 
   * @returns 
   */
  _displayContent(data) {
    return this.feed(require("./skeleton").default(this, data));
  }


}
__perdrix_manager.initClass();

module.exports = __perdrix_manager;
