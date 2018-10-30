var SenecaWeb = require('seneca-web');
var Express = require('express');
var context = new Express.Router();

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false } // so we can use body-parser
};

var app = Express()
      .use( require('body-parser').json() )
      .use( context )
      .listen(3000);

var seneca = require('seneca')()
      .use(SenecaWeb, senecaWebConfig )
      .use('../plugin/api')
      .client( { type:'tcp', pin:'role:math' } );
