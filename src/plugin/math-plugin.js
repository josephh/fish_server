var fs = require('fs');/* * A Seneca instance is just a set of action patterns.  Likewise, a Seneca plugin is just a set of action patterns.
*
* A plugin can have a name, which is used to annotate logging entries.
* Plugins can be given a set of options to control their behavior.
* Plugins also provide a mechanism for executing initialization functions in the correct order. (database connection is established before you try to read said database etc).
*
* A Seneca plugin is a function that has a single parameter options. You pass this plugin definition function to the seneca.use method.
*
* DON"T CALL .act(...) inside a plugin - it's only for abstracting the service code (rather than the client or event code) */
function math_plugin(options) {

  // the logging function, built by init
  var log;

  /**
  * the 'this' context variable of the plugin definition function is an instance of Seneca
  */
  this.add('role:math, cmd:sum', sum);
  this.add('role:math, cmd:product', product);
  this.wrap('role:math', function (msg, respond) {
    msg.left  = Number(msg.left).valueOf();
    msg.right = Number(msg.right).valueOf();
    this.prior(msg, respond);
  });

  /*
   * Plugins get a specific action 'init' pattern.  These are called in sequence for each plugin and must call its respond callback without errors. (If plugin initialization fails, then Seneca exits the Node.js process.  All plugins must complete initialization before any actions are executed.)
  */
  this.add('init:math_plugin', init);

  function init(msg, respond) {
    // log to a custom file
    fs.open(options.logfile, 'a', function(err, fd) {

      // cannot open for writing, so fail
      // this error is fatal to Seneca
      if (err)
        return respond(err);

      log = make_log(fd);
      respond();
    });
  }

  function sum(msg, respond) {
    var out = {
      answer: msg.left + msg.right
    };
    log(`sum ${msg.left} + ${msg.right} = ${out.answer}\n`);
    respond(null, out);
  }

  function product(msg, respond) {
    var out = {
      answer: msg.left * msg.right
    };
    log(`product ${msg.right} * ${msg.left} = ${out.answer}`);
    respond(null, out);
  }

  function make_log(fd) {
    return function(entry) {
      fs.write(fd, new Date().toISOString() + ' ' + entry + '\n', null, 'utf8', function(err) {
        if (err)
          return console.log(err);

        // ensure log entry is flushed
        fs.fsync(fd, function(err) {
          if (err)
            return console.log(err);
          }
        );
      });
    };
  }
}

require('seneca')()
// The seneca.use(...) takes two parameters
// 1. plugin definition function or name
// 2. options for the plugin
  .use(math_plugin, {logfile: './math.log'}).act('role:math,cmd:product,left:12,right:12', console.log);
