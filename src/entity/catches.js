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

  // this.add("role:store,entity:catches,operation:amend", update);
  //
  // /**
  // read all files during plugin init - cache all catches here
  // on write of new catch - add to exising cache
  //
  //  function get(msg, respond) {
  //    this.log.debug('catchStore plugin: get function');
  //    readFile("../data/catches.json", function(catchArray) {
  //      respond(null, {
  //        'fish': catchArray.filter(elem => elem.id === msg.id)[0] || 'not found'
  //      });  seneca expects 'plain' objects in the response
  //    });
  //  }
  //
  // function getAll(msg, respond) {
  //   this.log.debug('catchStore plugin: getAll function');
  //   readFile("../data/catches.json", function(catchArray) {
  //     respond(null, {
  //       'fishes': catchArray || 'not found'
  //     });  seneca expects 'plain' objects in the response
  //   });
  // }

  function update(msg, respond) {
    this.log.debug('catchStore plugin: update function');
    /**
     read files
     find matching id
     update
     write
     */
    var f = `../data/${msg.id}.json`;
    fs.unlink(f, function(err) {
      if (err)
        throw err;
      }
    );
    respond(null, `successfully deleted ${f}`);
  }

  function arrayFilter(fieldName, arrayVals, respond) {
    return function(catchArray) {
      var filtered = filtered = catchArray.filter(function(elem) {
        /**
         * make use of Array.filter(...)'s second argument: 'thisArg'.
         * "Value to use as this when executing callback."
         */
        return this.indexOf(elem[fieldName]) > - 1;
      }, arrayVals);
      respond(null, {
        'fishes': filtered || 'not found'
      });
    };
  }

  function readFile(filePath, cb) {
    fs.readFile(filePath, "utf-8", function(err, data) {
      if (err)
        throw err;
      cb(JSON.parse(data));
    });
  }

}

module.exports = catches_plugin;
