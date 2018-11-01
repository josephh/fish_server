var seneca = require('seneca')();
seneca.use('../plugin/catch-store');
// seneca.act({
//   role: 'store',
//   entity: 'catch',
//   operation: 'fetch',
//   id: 1}
// , console.log);
//
// seneca.act({
//   role: 'store',
//   entity: 'catch',
//   operation: 'fetchAll'}
// , console.log);
//
// seneca.act({
//   role: 'store',
//   entity: 'catch',
//   operation: 'fetchByAngler',
//   anglers: 'jon J'}
// , console.log);
//
// seneca.act({
//   role: 'store',
//   entity: 'catch',
//   operation: 'fetchByAngler',
//
//   anglers: ['sandra X', 'JJ']}
// , console.log);
//
// seneca.act({
//   role: 'store',
//   entity: 'catch',
//   operation: 'fetchBySpecies',
//   species: 'roach'}
// , console.log);
//
// seneca.act({
//   role: 'store',
//   entity: 'catch',
//   operation: 'fetchBySpecies',
//   species: ['roach', 'pike']}
// , console.log);

/**
{
  'id': 0,
  "species": "roach",
  "weight": "2.5lb",
  "length": "32cm",
  "lat": 51.055551,
  "long": -1.769147,
  "photoUrls": [
    "string"
  ],
  "angler": "Jon J",
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ]
}*/

/*
seneca.act({
  role: 'store',
  entity: 'catch',
  operation: 'add',
  species: 'dace',
  weight: '0.7lb',
  length: '12cm',
  lat: 51.055551,
  long: -1.769147,
  photoUrls: [],
  angler: 'Jon J'}
, console.log);
*/

seneca.act({
  role: 'store',
  entity: 'catch',
  operation: 'remove',
  id: '4'}
, console.log);
