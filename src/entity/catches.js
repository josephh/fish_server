function catches_plugin( /* options */ ) { // the function identifier/name is the equivalent of returning a string value from this function

  this.use('../data/catches/catch-store');

  this.add('entity:catches,operation:fetch', (msg, respond) => {
    if (!msg.hasOwnProperty('id') || !msg.id) {
      respond({
        error: 'no id parameter in request'
      });
    } else {
      this.act(`data:store,operation:get,id:${msg.id}`, respond);
    }
  });

  this.add('entity:catches,operation:fetchAll', (msg, respond) => {
    this.act('data:store,operation:getAll', respond);
  });

  this.add('entity:catches,operation:fetchBy', (msg, respond) => {
    var filters = msg.query || {};
      var args = {
        data: 'store',
        operation: 'getBy',
        filters: filters
      };
    // jsonic expects commas and square brackets to be in quotes...
    this.act(args, respond);
  });

  this.add("entity:catches,operation:add", (msg, respond) => {
    var payload = {
      species: msg.payload.species,
      angler: msg.payload.angler,
      weight: msg.payload.weight,
      length: msg.payload.length,
      lat: msg.payload.latitude,
      longitude: msg.payload.longitude,
      photoUrls: msg.payload.photoUrls ? msg.payload.photoUrls.split(',') : [],
      tags: msg.payload.tags
    };
    var args = {
      data: 'store',
      operation: 'create',
      newCatch: payload
    };
    this.act(args, respond);
  });

  this.add("entity:catches,operation:remove", (msg, respond) => {
    var args = {
      data: 'store',
      operation: 'delete',
      id: msg.params.catchId // routing will not reach this point if there is no id slug in the URL
    };
    this.act(args, respond);
  });

  this.add("entity:catches,operation:update", (msg, respond) => {
    var toUpdate = {
      id: msg.params.catchId,
      species: msg.payload.species,
      angler: msg.payload.angler,
      weight: msg.payload.weight,
      length: msg.payload.length,
      lat: msg.payload.latitude,
      longitude: msg.payload.longitude,
      photoUrls: msg.payload.photoUrls,
      tags: msg.payload.tags
    };

    var args = {
      data: 'store',
      operation: 'amend',
      args: toUpdate
    };
    this.act(args, respond);
  });

}

module.exports = catches_plugin;
