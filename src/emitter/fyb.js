var seneca = require('seneca')();
seneca.use('../entity/catches');
//
// seneca.act({
//   entity: 'catches',
//   operation: 'fetch',
//   id: 1
// }, console.log);
//
// seneca.act({
//   entity: 'catches',
//   operation: 'fetchAll'
// }, console.log);
//
// seneca.act({
//   entity: 'catches',
//   operation: 'fetchBy',
//   angler: 'jon J',
//   species: [
//     'pike', 'roach'
//   ],
//   location: {
//     long: "51.055551",
//     lat: "-1.769147",
//     radius: 10
//   }
// }, console.log);
//
// seneca.act({
//   entity: 'catches',
//   operation: 'fetchByAngler',
//   angler: 'sandra X'
// }, console.log);
//
// seneca.act({
//   entity: 'catches',
//   operation: 'fetchBySpecies',
//   species: ['roach', 'chub']
// }, console.log);

// seneca.act({
//   entity: 'catches',
//   operation: 'add',
//   species: 'dace',
//   weight: '0.7lb',
//   length: '12cm',
//   lat: 51.055551,
//   long: -1.769147,
//   photoUrls: [],
//   angler: 'Jon J'
// }, console.log);

// seneca.act({
//   entity: 'catches',
//   operation: 'remove',
//   id: '12'}
// , console.log);
