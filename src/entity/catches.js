function catches_plugin(/* options */) { // the function identifier/name is the equivalent of returning a string value from this function

  this.use('../data/catches/catch-store');

  this.add('entity:catches,operation:fetch', (msg, respond) => {
    if (!msg.hasOwnProperty('id') || !msg.id) {
      respond({error: 'no id parameter in request'});
    } else {
      this.act(`data:store,operation:get,id:${msg.id}`, respond);
    }
  });

  this.add('entity:catches,operation:fetchAll', (msg, respond) => {
    this.act('data:store,operation:getAll', respond);
  });

  this.add('entity:catches,operation:fetchBy', (msg, respond) => {
    var args = {
      data: 'store',
      operation: 'getBy'
    };
    if (msg.hasOwnProperty('angler'))
      args.angler = msg.angler;
    if (msg.hasOwnProperty('species'))
      args.species = msg.species;
    if (msg.hasOwnProperty('location'))
      args.location = msg.location;

    // jsonic expects commas and square brackets to be in quotes...
    this.act(args, respond);
  });

  this.add("entity:catches,operation:fetchBySpecies", (msg, respond) => {
    var args = {
      data: 'store',
      operation: 'getBySpecies'
    };
    if (msg.hasOwnProperty('species')) {
      args.species = msg.species;
      this.act(args, respond);
    } else {
      respond({error: 'no species parameter in request'});
    }
  });

  this.add("entity:catches,operation:fetchByAngler", (msg, respond) => {
    var args = {
      data: 'store',
      operation: 'getByAngler'
    };
    if (msg.hasOwnProperty('angler')) {
      args.angler = msg.angler;
      this.act(args, respond);
    } else {
      respond({error: 'no angler parameter in request'});
    }
  });

  this.add("entity:catches,operation:add", (req, respond) => {
    var payload = {
      species: req.payload.species,
      angler: req.payload.angler,
      weight: req.payload.weight,
      length: req.payload.length,
      lat: req.payload.latitude,
      longitude: req.payload.longitude,
      photoUrls: req.payload.photoUrls,
      tags: req.payload.tags
    };

    var args = {
      data: 'store',
      operation: 'create',
      newCatch: payload
    };
    this.act(args, respond);
  });

  this.add("entity:catches,operation:remove", (msg, respond) => {
    if (!msg.hasOwnProperty('id') || !msg.id) {
      respond({error: 'no id parameter in request'});
    } else {
      this.act('data:store,operation:delete,id:' + msg.id, respond);
    }
  });

  this.add("entity:catches,operation:update", (req, respond) => {
    var toUpdate = {
      id: req.params.catchId,
      species: req.payload.species,
      angler: req.payload.angler,
      weight: req.payload.weight,
      length: req.payload.length,
      lat: req.payload.latitude,
      longitude: req.payload.longitude,
      photoUrls: req.payload.photoUrls,
      tags: req.payload.tags
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
