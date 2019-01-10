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
          path: '/api/ping'
        }, {
          path: '/api/catches'
        }, {
          path: '/api/catches/{catchId}',
          method: 'put'
        }, {
          path: '/api/catches',
          method: 'post'
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

    // you can throw errors!
    seneca.addAsync('cmd:error', async () => {
      throw new Error('aw snap!');
    });

    // you can await other actions!
    seneca.addAsync('cmd:test', async () => {
      return ({out: 'here you go'});
    });

    server.route({
      method: 'GET',
      path: '/api/ping',
      handler: function() {
        return seneca.actAsync('role:api,cmd:ping');
      }
    });

    seneca.add('role:api,cmd:ping', function(msg, done) {
      done(null, {
        pong: true,
        api: true,
        time: Date.now()
      });
    });

    server.route({
      method: 'GET',
      path: '/api/catches',
      handler: function() {
        return seneca.actAsync({entity: 'catches', operation: 'fetchAll'});
      }
    });

    server.route({
      method: 'PUT',
      path: '/api/catches/{catchId}',
      handler: function(req, h) {

        seneca.log.debug('/api/catches PUT', req.params, req.payload);

        return seneca.actAsync('entity:catches,operation:update', req).then(function(result) {
          if (result.error && result.error.includes("not found")) {
            return h.response(result).code(404).type('application/json');
          } else {
            return h.response(result).code(200).type('application/json');
          }
        }, function(err) {
          seneca.log.error('Message {entity:catches,operation:update} for catchId ' + req.params.catchId + ' Details: ' + err);
        });

      }
    });

    server.route({
      method: 'POST',
      path: '/api/catches',
      handler: function(req, h) {

        seneca.log.debug('/api/catches POST', req.params, req.payload);

        return seneca.actAsync('entity:catches,operation:add', req).then(function(result) {
          if (result.error && result.error.includes("bad request")) {
            return h.response(result).code(400).type('application/json');
          } else if (result.error && result.error.includes("missing fields")) {
            return h.response(result).code(400).type('application/json');
          } else {
            return h.response(result).code(201).type('application/json');
          }
        }, function(err) {
          seneca.log.error('Details: ' + err);
        });

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
  console.log(`Api-service Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

start();
