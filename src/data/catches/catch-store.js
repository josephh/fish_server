const fs = require('fs'),
  path = require('path'),
  CatchesFilter = require('./catch-filter'),
  catchesDir = path.join(__dirname, '../catches/');

var store_plugin = function( /* options */ ) {

  this.add("data:store,operation:get", catchById);
  this.add("data:store,operation:getAll", allCatches);
  this.add("data:store,operation:getBy", filtered);
  this.add("data:store,operation:create", newCatch);
  this.add("data:store,operation:delete", deleteCatch);
  this.add("data:store,operation:amend", amendCatch);

  var catches = null,
    seneca = this;

  this.add({
    init: 'store_plugin'
  }, init);

  function init(msg, respond) {
    catches = readFiles('.json');
    respond();
  }

  function catchById(msg, respond) {
    if (catches.length == 0)
      respond({
        out: `No catches stored`
      });
    respond({
      catch: catches.filter(elem => elem.id == msg.id)[0] || `Catch with id ${msg.id} not found`
    });
  }

  function allCatches(msg, respond) {
    respond({
      catches: catches || `No catches found`
    });
  }

  function filtered(msg, respond) {
    var filters = msg.filters || {};
    this.log.info(
      `Anglers : ${filters.anglers
      ? filters.anglers
      : 'none'}`);
    this.log.info(`Species : ${filters.species ? filters.species : 'none'}`);
    if (!filters.location) {
      this.log.info(`Location : none`);
    } else {
      this.log.info(`Location longitude: ${filters.location.longitude ? filters.location.longitude : 'no longitude ' }; latitude: ${filters.location.latitude ? msg.location.latitude  : 'no latitude'}`);
    }
    var out = `No filtered catches found`;
    if (filters.anglers && filters.species) {
      out = CatchesFilter.and(filters.anglers.split(','), filters.species.split(','), catches) || `No filtered catches found`;
    } else {
      if (filters.anglers) out = CatchesFilter.filter('angler', filters.anglers.split(','), catches);
      if (filters.species) out = CatchesFilter.filter('species', filters.species.split(','), catches);
      // TODO location object parameters ? if (msg.location) {...}
    }
    respond({
      catches: out
    });
  }

  function newCatch(msg, respond) {
    var newCatch = msg.newCatch;

    var missingFields = [];
    if (!newCatch.hasOwnProperty('angler') || !newCatch.angler)
      missingFields.push('angler');

    if (missingFields.length > 0) {
      respond({
        error: `missing fields: ${missingFields}`
      });
    } else {
      newCatch.id = nextId();
      var fileName = `${newCatch.id}.json`;
      writeFile(`${catchesDir}${fileName}`, JSON.stringify(newCatch), function() {
        seneca.log.info(`file (${fileName}) written OK`);
        catches.push(newCatch);
        respond(null, {
          catches: newCatch
        });
      });
    }
  }

  function deleteCatch(msg, respond) {
    var f = `${catchesDir}${msg.id}.json`;
    fs.unlink(f, function(err) {
      if (err) {
        respond({
          error: `Failed to delete catch with id ${msg.id} : ${err}`
        });
      } else {
        // get the catches index for the item to remove
        var i = catches.findIndex(elem => {
          return elem.id && elem.id == msg.id;
        });
        catches.splice(i, 1); // remove from array
        respond(null, {
          out: `Successfully deleted catch with id ${msg.id}`
        });
      }
    });
  }

  function amendCatch(msg, respond) {
    var existingCatch = msg.args,
      updatedCatch = catches.filter(elem => elem.id == existingCatch.id)[0];
    if (updatedCatch) {
      // overwrite any fields found in the input over the existing record
      if (existingCatch.hasOwnProperty('species') && existingCatch.species) {
        updatedCatch.species = existingCatch.species;
      }
      if (existingCatch.hasOwnProperty('weight') && existingCatch.weight) {
        updatedCatch.weight = existingCatch.weight;
      }
      if (existingCatch.hasOwnProperty('length') && existingCatch.length) {
        updatedCatch.length = existingCatch.length;
      }
      if (existingCatch.hasOwnProperty('latitude') && existingCatch.latitude) {
        updatedCatch.latitude = existingCatch.latitude;
      }
      if (existingCatch.hasOwnProperty('longitude') && existingCatch.longitude) {
        updatedCatch.longitude = existingCatch.longitude;
      }
      if (existingCatch.hasOwnProperty('angler') && existingCatch.angler) {
        updatedCatch.angler = existingCatch.angler;
      }
      if (existingCatch.hasOwnProperty('photoUrls') && existingCatch.photoUrls) {
        updatedCatch.photoUrls = existingCatch.photoUrls;
      }
      if (existingCatch.hasOwnProperty('tags') && existingCatch.tags) {
        updatedCatch.tags = existingCatch.tags;
      }
      var fileName = `${updatedCatch.id}.json`;
      writeFile(`${catchesDir}${fileName}`, JSON.stringify(updatedCatch), function() {
        seneca.log.info(`file (${fileName}) updated OK`);
        // get the catches index for the item to remove
        var i = catches.findIndex(elem => {
          return elem.id && elem.id == updatedCatch.id;
        });
        catches.splice(i, 1, updatedCatch); // replace in array
        respond(null, {
          catches: updatedCatch
        });
      });
    } else {
      respond({
        "error": "not found (catch with id " + existingCatch.id + ")"
      });
    }
  }

  function readFiles(ext) {
    var c = [];
    fs.readdirSync(catchesDir).forEach(function(f) {
      if (path.extname(f) === ext) {
        try {
          c.push(JSON.parse(fs.readFileSync(catchesDir + f, 'utf-8')));
        } catch (err) {
          seneca.log.error(`problem reading file ${f} : ${err}`);
        }
      }
    });
    return c;
  }

  function writeFile(filePath, data, cb) {
    fs.writeFile(filePath, data, function(err) {
      if (err)
        throw err;
      cb();
    });
  }

  function nextId() {
    var topId = catches.map(elem => elem.id).sort((a, b) => {
      return Number.parseInt(a) - Number.parseInt(b);
    }).pop();
    return ++topId;
  }

};

module.exports = store_plugin;
