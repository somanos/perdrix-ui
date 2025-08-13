
const { address } = require("../../skeleton")
const Form = require('../../form');

class __form_location extends Form {


  /**
   * 
   */
  initialize(opt = {}) {
    require('./skin');
    super.initialize(opt);
    this.declareHandlers();
    this.model.atLeast({
      type: 'company',
      category: 0
    })
    this._data = {}
  }

  /**
  * 
  */
  data() {
    const {
      category,
      city,
      ctime,
      custId,
      custName,
      gender,
      geometry,
      location,
      postcode,
      street,
      type,
    } = this.model.toJSON();

    return {
      category,
      city,
      ctime,
      custId,
      custName,
      gender,
      geometry,
      location,
      postcode,
      street,
      type,
    }
  }

  /**
   * 
   * @param {*} cmd 
   * @param {*} extended 
   */
  async mergeAddresses() {
    const { src, dest } = this._data || {};
    this.debug("AAA:62", this._data)
    if (!src?.id || !dest?.id) {
      return;
    }
    this.postService(PLUGINS.address.merge, { srcId: src.id, destId: dest.id }).then((data) => {
      RADIO_BROADCAST.trigger('address-update')
      this.goodbye()
    }).catch((e) => {
      this.warn("Failed to update", e)
    })

  }


  /**
   * customer
   * site
   * poc_map
   */

  /**
   * 
   */
  updateLocation() {
    this.debug("AAA:98", this.getData())
    let args = this.getData();
    args.addressId = this.mget('addressId')
    this.postService(PLUGINS.address.modify, { args }).then((data) => {
      this._data = data;
      const { src, dest } = data;
      if (src && dest) {
        this.ensurePart('wrapper-dialog').then((p) => {
          p.feed(require('./skeleton/confirm')(this, src, dest))
        })
        return
      }
      RADIO_BROADCAST.trigger('address-update')
      this.goodbye()
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
    switch (service) {
      case _e.update:
        this.updateLocation(cmd, args);
        break;
      case _e.cancel:
        this.__wrapperDialog.clear();
        break;
      case "merge":
        this.mergeAddresses();
        break;
      default:
        super.onUiEvent(cmd, args)
    }
  }

}

module.exports = __form_location
