require('seneca')()
  .use('../math-module') // this is a sencea shorthand for requiring node.js modules (could also be .use(require('../math-plugin.js')))
  .listen(4321); // default transport is http
