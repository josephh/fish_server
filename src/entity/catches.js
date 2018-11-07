function catches_plugin(/* options */) { // the function identifier/name is the equivalent of returning a string value from this function

  this.use('../data/catches/catch-store');

  this.add("entity:catches,operation:fetch", (msg, respond) => {
    this.act(`data:store,operation:get,id:${msg.id}`, respond);
  });

  this.add("entity:catches,operation:fetchAll",  (msg, respond) => {
    this.act(`data:store,operation:getAll`, respond);
  });

  //
  // this.add("role:store,entity:catch,operation:fetchAll", getAll);
  // this.add("role:store,entity:catch,operation:fetchByAngler", getByAngler);
  // this.add("role:store,entity:catch,operation:fetchBySpecies", getBySpecies);
  // this.add("role:store,entity:catch,operation:add", create);
  // this.add("role:store,entity:catch,operation:remove", deleteCatch);
  // this.add("role:store,entity:catch,operation:amend", update);
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
  //
  // function getByAngler(msg, respond) {
  //   this.log.debug('catchStore plugin: getByAngler function');
  //   var vals = [];
  //   if (typeof msg.anglers == 'string')
  //     vals.push(msg.anglers);
  //   if (Array.isArray(msg.anglers))
  //     vals = msg.anglers;
  //   readFile("../data/catches.json", arrayFilter('angler', vals, respond));
  // }
  //
  // function getBySpecies(msg, respond) {
  //   this.log.debug('catchStore plugin: getBySpecies function');
  //   var vals = [];
  //   if (typeof msg.species == 'string')
  //     vals.push(msg.species);
  //   if (Array.isArray(msg.species))
  //     vals = msg.species;
  //   readFile("../data/catches.json", arrayFilter('species', vals, respond));
  // }
  //
  // function create(msg, respond) {
  //   this.log.debug('catchStore plugin: add function');
  //   var newCatch = {
  //     id: nextId(),
  //     species: msg.species,
  //     weight: msg.weight,
  //     length: msg.length,
  //     lat: msg.lat,
  //     long: msg.long,
  //     photoUrls: msg.photoUrls,
  //     angler: msg.angler,
  //     tags: msg.tags
  //   };
  //   var fileName = `catch_${newCatch.id}.json`;
  //   writeFile(`../data/${fileName}`, JSON.stringify(newCatch), function() {
  //     this.log.debug(`file (${fileName}) written OK`);
  //     respond(null, {
  //       fishes: newCatch/* || throw Error ??????? */
  //     });
  //   });
  // }
  //
  // function deleteCatch(msg, respond) {
  //   this.log.debug('catchStore plugin: deleteCatch function');
  //   var f = `../data/${msg.id}.json`;
  //   console.log(`\n about to try n delete ${f} \n`);
  //   fs.unlink(f, function(err) {
  //     if (err)
  //       throw err;
  //   });
  //   respond(null, `successfully deleted ${f}`);
  // }
  //
  // function update(msg, respond) {
  //   this.log.debug('catchStore plugin: update function');
  //    read files
  //    find matching id
  //    update
  //    write
  //   var f = `../data/${msg.id}.json`;
  //   console.log(`\n about to try n delete ${f} \n`);
  //   fs.unlink(f, function(err) {
  //     if (err)
  //       throw err;
  //   });
  //   respond(null, `successfully deleted ${f}`);
  // }
  //
  // function arrayFilter(fieldName, arrayVals, respond) {
  //   return function(catchArray) {
  //     var filtered = filtered = catchArray.filter(function(elem) {
  //        make use of Array.filter(...)'s second argument: 'thisArg'.  "Value to use as this when executing callback."
  //       return this.indexOf(elem[fieldName]) > - 1;
  //     }, arrayVals);
  //     respond(null, {
  //       'fishes': filtered || 'not found'
  //     });  seneca expects 'plain' objects in the response
  //   };
  // }
  //
  // function writeFile(filePath, data, cb) {
  //   fs.writeFile(filePath, data, function(err) {
  //     if (err)
  //       throw err;
  //     cb();
  //   });
  // }
  //
  //  function readFile(filePath, cb) {
  //    fs.readFile(filePath, "utf-8", function(err, data) {
  //      if (err)
  //        throw err;
  //      cb(JSON.parse(data));
  //    });
  //  }
  //
  // function nextId() {
  //   var catchArray = JSON.parse(fs.readFileSync("../data/catches.json", {encoding: 'utf-8'}));
  //   var topId = catchArray.map(elem => elem.id).sort().pop();
  //   return ++topId;
  // }

}

module.exports = catches_plugin;
