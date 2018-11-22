const fs = require('fs'),
  path = require('path'),
  CatchesFilter = require('./catch-filter'),
  catchesFilePath = '../data/catches/';

var store_plugin = function(/* options */) {

  this.add("data:store,operation:get", catchById);
  this.add("data:store,operation:getAll", allCatches);
  this.add("data:store,operation:getBy", filtered);
  this.add("data:store,operation:getByAngler", filteredByAngler);
  this.add("data:store,operation:getBySpecies", filteredBySpecies);
  this.add("data:store,operation:create", newCatch);

  var catches = null,
    seneca = this;

  this.add({
    init: 'store_plugin'
  }, init);

  function init(msg, respond) {
    readFiles('.json');
    // on write of new catch - add to exising cache
    // on delete - remove from catches
    // on update/ upsert, edit here then write
    respond();
  }

  function catchById(msg, respond) {
    if (catches.length == 0)
      respond({out: `Catch with id ${msg.id} not found`});
    respond({
      catch  : catches.filter(elem => elem.id == msg.id)[0] || `Catch with id ${msg.id} not found`
    });
  }

  function allCatches(msg, respond) {
    respond({
      catches: catches || `No catches found`
    });
  }

  function filtered(msg, respond) {
    this.log.debug(
      `Anglers : ${msg.angler
      ? msg.angler
      : 'none'} `);
    this.log.debug(`Species : ${msg.species}`);
    this.log.debug(`Location long: ${msg.location.long}; lat: ${msg.location.lat}; radius ${msg.location.radius}`);
    respond({
      catches: CatchesFilter.and(msg.angler, msg.species, catches) || `No AND filtered catches found`
    });
  }

  function filteredByAngler(msg, respond) {
    respond({
      catches: CatchesFilter.single('angler', msg.angler, catches) || `No angler filtered catches found`
    });
  }

  function filteredBySpecies(msg, respond) {
    respond({
      catches: CatchesFilter.multi('species', msg.species, catches) || `No species filtered catches found`
    });
  }

  function newCatch(msg, respond) {
    var newCatch = msg.newCatch;
    newCatch.id = nextId();
    var fileName = `${newCatch.id}.json`;
    writeFile(`${catchesFilePath}${fileName}`, JSON.stringify(newCatch), function() {
      seneca.log.debug(`file (${fileName}) written OK`);
      respond(null, {
        fishes: newCatch/* || throw Error ??????? */
      });
    });
  }

  function readFiles(ext) {
    if (!catches)
      catches = [];
    fs.readdirSync(catchesFilePath).forEach(function(f) {
      if (path.extname(f) === ext) {
        try {
          catches.push(JSON.parse(fs.readFileSync(catchesFilePath + f, 'utf-8')));
        } catch (err) {
          seneca.debug.log(`problem reading file ${f} : ${err}`);
        }
      }
    });
  }

  function writeFile(filePath, data, cb) {
    fs.writeFile(filePath, data, function(err) {
      if (err)
        throw err;
      cb();
    });
  }

  function nextId() {
    var topId = catches.map(elem => elem.id).sort().pop();
    return++ topId;
  }

};

module.exports = store_plugin;
