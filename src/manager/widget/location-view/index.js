
const Leaflet = require('leaflet');
require('leaflet/dist/leaflet.css');

class __locaion_view extends LetcBox {

  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
  }

  /**
   * 
   * @returns 
   */
  async showMap() {
    const attribution = `\u003ca href="https://www.maptiler.com/copyright/" target="_blank\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"`;

    const { geometry, location, city } = this.model.toJSON()
    if (!geometry || !geometry.coordinates) return;
    let [lat, lon] = geometry.coordinates;
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
      attribution,
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
    let { location, geometry = {}, postcode, type, siteId } = this.model.toJSON();
    let { coordinates = [] } = geometry;
    if (!postcode || !location) return;
    let i = 0;
    let loc = []
    for (let l of location) {
      if (l) loc.push(l)
      if (i > 2) break;
      i++;
    }
    if (coordinates.length) {
      return this.showMap()
    }
    if (!loc.length) return;

    let args = { location: loc, postcode, type, id: siteId }
    this.postService('pdx_utils.get_geoloc', args)
      .then((data) => {
        this.showMap()
      })
  }

  /**
   * Upon DOM refresh, after element actually insterted into DOM
   */
  onDomRefresh() {
    this.debug("AAA:17", this)
    this.feed(require('./skeleton')(this));
    this.checkGeo()
  }

  /**
   * User Interaction Evant Handler
   * @param {View} trigger
   * @param {Object} args
   */
  onUiEvent(trigger, args = {}) {
    const service = this.mget(_a.service) || "open-viewer";
    this.triggerHandlers({
      service,
    })
  }


}

module.exports = __locaion_view