'use strict';

const PORT = process.env.PORT || process.argv[2] || 0;
const HOST = process.env.HOST || process.argv[3] || '127.0.0.1';
const BASES = (process.env.BASES || process.argv[4] || '').split(',');
const SILENT = process.env.SILENT || process.argv[5] || 'true';

const Hapi = require('hapi');
const seneca = require('seneca')().use('seneca-promise');
const Rif = require('rif')();
const host = Rif(HOST) || HOST;

const server = new Hapi.Server({host: host, port: PORT});

const start = async () => {

  await server.register({
    plugin: require('wo'),
    options: {
      bases: BASES,
      route: [
        {
          path: '/api/catches'
        }
      ],
      sneeze: {
        host: host,
        silent: JSON.parse(SILENT),
        swim: {
          interval: 1111
        }
      }
    }
  });

  seneca.ready(() => {

    server.route({
      method: 'GET',
      path: '/api/catches',
      handler: function() {
        return seneca.actAsync({entity: 'catches', operation: 'fetchAll'});
      }
    });

    seneca.use('mesh', {
      host: host,
      bases: BASES,
      sneeze: {
        silent: JSON.parse(SILENT),
        swim: {
          interval: 1111
        }
      }
    }).use('../entity/catches');

  });

  // Start hapi server (starts cache)

  await server.start();
  console.log(`Api-catches Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

start();
