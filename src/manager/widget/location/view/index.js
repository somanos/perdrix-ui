
const Leaflet = require('leaflet');

require('leaflet/dist/leaflet.css');
const {
  loadWidget, getLocationFields
} = require("../../../utils")

class __locaion_view extends LetcBox {
  constructor(...args) {
    super(...args);
    this.loadWidget = loadWidget.bind(this);
    this.getLocationFields = getLocationFields.bind(this);
  }

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.model.atLeast({ showMap: 1 })
  }

  /**
  * 
  */
  data() {
    const {
      addressId,
      city,
      ctime,
      geometry,
      location,
      postcode,
      streetname,
    } = this.model.toJSON();

    return {
      addressId,
      city,
      ctime,
      geometry,
      location,
      postcode,
      street: streetname,
      ...this.getLocationFields(location)
    }
  }

  /**
   * 
   */
  hasCoordinates() {
    let { coordinates } = this.mget(_a.geometry) || {};
    return (coordinates && coordinates.length > 1)
  }

  /**
   * 
   * @returns 
   */
  async showMap() {
    const { geometry, location, city } = this.model.toJSON()
    let { coordinates } = geometry || {};
    let [lat, lon] = coordinates || [];
    if (!lat || !lon) return;
    let w = await this.ensurePart("map-container");
    w.el.dataset.state = 1;
    let center = Leaflet.latLng(lon, lat);
    let id = `${this.get(_a.widgetId)}-map`;
    let map = Leaflet.map(id, {
      center,
      zoom: 14,
    });
    const key = Env.get('map_tiler_api_key');
    let url = `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`;
    Leaflet.tileLayer(url, {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      attribution: "",
      crossOrigin: true
    }).addTo(map);
    let content = '';
    for (let l of location) {
      if (l) {
        content = `${content} ${l}`;
      }
    }
    if (content) content = `${content}<br />`;

    content = `${content} ${city}`;
    content = content.replace(/ +\<br *\/\>/, '');
    Leaflet.tooltip(center, { content, permanent: true }).addTo(map);
  }

  /**
   * Ask backend to update geomery when empty
   */
  checkGeo() {
    let {
      location, postcode, type, siteId, custId, id, addressId
    } = this.model.toJSON();
    if (!postcode || !location) return;
    let i = 0;
    let loc = []
    for (let l of location) {
      if (l) loc.push(l)
      if (i > 2) break;
      i++;
    }
    if (this.hasCoordinates()) {
      return this.showMap()
    }
    if (!loc.length) return;
    if (type == 'site') {
      id = siteId;
    } else if (type == 'customer') {
      id = custId;
    }
    if (!id) {
      this.warn("Got no site id", { id, type, siteId, custId })
    }
    let args = { location: loc, postcode, type, id, addressId }
    this.debug("AAA:117", args)
    this.postService('pdx_utils.get_geoloc', args)
      .then((data) => {
        delete data.type;
        this.mset(data);
        this.showMap()
      })
  }

  /**
   * 
   */
  promptLocation() {
    const { custId } = this.data();
    this.loadWidget({
      kind: 'form_location',
      id: `location-form-${custId}`,
      uiHandler: this.getHandlers(_a.ui),
      ...this.data(),
      type: !this.mget(_a.gender) ? 'company' : 'person',
      callbackService: this.mget('callbackService'),
      isUpdate: 1
    })
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.feed(require('./skeleton')(this));
    if (this.mget('showMap')) {
      this.checkGeo()
    }
  }

  /**
   * User Interaction Evant Handler
   * @param {View} cmd
   * @param {Object} args
   */
  onUiEvent(cmd, args = {}) {
    const service = cmd.mget(_a.service) || "open-viewer";
    this.debug("AAA:119", service, cmd.mget(_a.state), this)
    switch (service) {
      case _a.toggle:
        this.mset({ showMap: cmd.mget(_a.state) });
        if (this.mget('showMap')) {
          this.checkGeo();
        }
        this.ensurePart("map-container").then((p) => {
          p.el.dataset.state = cmd.mget(_a.state);
        })
        break;
      case 'update-address':
        this.promptLocation();
        break;
      default:
        this.triggerHandlers({ service: this.mget(_a.service) })
    }
    // if (!cmd.mget(_a.state)) {
    //   if (!this.mget('showMap')) {
    //     this.mset({ showMap: 1 })
    //     this.checkGeo();
    //   }
    // }
  }


}

module.exports = __locaion_view