// node front/front.js 127.0.0.1 127.0.0.1:39000,127.0.0.1:39001 "" &

'use strict';
var HOST = process.env.HOST || process.argv[2] || '127.0.0.1';
var BASES = (process.env.BASES || process.argv[3] || '').split(',');
var SILENT = process.env.SILENT || process.argv[4] || 'true';

const Hapi = require('hapi');
const Rif = require('rif');
var rif = Rif();
var host = rif(HOST) || HOST;

const server = Hapi.server({
  port: 3000,
  host: host,
  routes: {
    cors: true
  }
});

const init = async () => {

  await server.register(require('inert'));

  await server.register({
    plugin: require('wo'),
    options: {
      bases: BASES,
      sneeze: {
        host: host,
        silent: JSON.parse(SILENT),
        swim: {
          interval: 1111
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/ping',
    handler: {
      wo: {}
    }
  });

  server.route({
    method: 'GET',
    path: '/api/catches/{catchId?}',
    handler: {
      wo: {}
    }
  });

  server.route({
    method: 'PUT',
    path: '/api/catches/{catchId}',
    handler: {
      wo: {
        passThrough: true
      }
    }
  });

  server.route({
    method: 'POST', path: '/api/catches', handler:
    {
       wo: {
         passThrough: true
       }
    }
  });

  server.route({
    method: 'DELETE', path: '/api/catches/{catchId}', handler:
    {
       wo: {
         passThrough: true
       }
    }
  });

await server.start();
console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

console.log(err);
process.exit(1);
});

init();
