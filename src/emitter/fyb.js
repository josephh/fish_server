var seneca = require('seneca')();
seneca.use('../entity/catches');

seneca.act({
  entity: 'catches',
  operation: 'fetch',
  id: 1
}, console.log);

seneca.act({
  entity: 'catches',
  operation: 'fetchAll'
}, console.log);

seneca.act({
    entity: 'catches',
    operation: 'fetchBy',
    query: {
      anglers: 'jon j',
      species: 'pike'
    }
  },
  console.log);

seneca.act({
  entity: 'catches',
  operation: 'add',
  species: 'dace',
  weight: '0.7lb',
  length: '12cm',
  latitude: 51.055551,
  longitude: -1.769147,
  photoUrls: '' ,
  angler: 'Jon J'
}, console.log);

seneca.act({
  entity: 'catches',
  operation: 'remove',
  id: '19'}
, console.log);

seneca.act({
  entity: 'catches',
  operation: 'update',
  id: '3',
  species: 'salmon',
  angler: 'big xavi'
},
console.log);
