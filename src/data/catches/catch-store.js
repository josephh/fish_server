const fs = require('fs'),
  path = require('path'),
  catchesFilter = require('./catch-filter'),
  catchesFilePath = '../data/catches/'
  ;

var store_plugin = function(/* options */) {

  this.add("data:store,operation:get", get);
  this.add("data:store,operation:getAll", getAll);
  this.add("data:store,operation:getBy", getFiltered);

  var catches = null, seneca = this;

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

  function get(msg, respond) {
    if (catches.length == 0)
      respond({out: `Catch with id ${msg.id} not found`});
    respond({
      catch  : catches.filter(elem => elem.id == msg.id)[0] || `Catch with id ${msg.id} not found`
    });
  }

  function getAll(msg, respond) {
    respond({
      catches: catches || `No catches found`
    });
  }

  function getFiltered(msg, respond) {
    this.log.debug(`Anglers : ${msg.angler ? msg.angler : 'none'} `);
    this.log.debug(`Species : ${msg.species}`);
    this.log.debug(`Location long: ${msg.location.long}; lat: ${msg.location.lat}; radius ${msg.location.radius}`);
    respond({
      catches: catchesFilter(msg.angler, msg.species, catches) || `No filtered catches found`
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

};

module.exports = store_plugin;
