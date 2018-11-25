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

  this.add("entity:catches,operation:add", (msg, respond) => {
    var missingFields = [];
    if (!msg.hasOwnProperty('angler') || !msg.angler)
      missingFields.push('angler');

    if (missingFields.length > 0) {
      respond({error: `missing fields: ${missingFields}`});
    } else {
      var args = {
        data: 'store',
        operation: 'create',
        newCatch: {
          species: msg.species,
          weight: msg.weight,
          length: msg.length,
          lat: msg.lat,
          long: msg.long,
          photoUrls: msg.photoUrls,
          angler: msg.angler,
          tags: msg.tags
        }
      };
      this.act(args, respond);
    }
  });

  this.add("entity:catches,operation:remove", (msg, respond) => {
    if (!msg.hasOwnProperty('id') || !msg.id) {
      respond({error: 'no id parameter in request'});
    } else {
      this.act('data:store,operation:delete,id:' + msg.id, respond);
    }
  });

  this.add("entity:catches,operation:update", (msg, respond) => {
    var args = {
      data: 'store',
      operation: 'amend',
      args: msg
    };
    this.act(args, respond);
  });

}

module.exports = catches_plugin;
