var seneca = require('seneca')();

function factorial(i) {
  if(i >= 1) return i * factorial(--i);
  else return 1;
}

/* * WHEN YOU SEE THIS PATTERN DO THE FOLLOWING...
* add method takes 2 parameters:
** 'pattern' - to match in any json messages received by seneca
** 'action' - to execute on a match.   action itself takes 2 parameters:
**** msg - the plaintext matching inbound message
**** response - a callback, with a node.js typical signature (error, data) */
seneca.add({
  role: "math",
  cmd: "sum"
}, (msg, reply) => {
  reply(null, {
    answer: (msg.left + msg.right)
  });
});

seneca.add({
  role: 'math',
  cmd: 'product'
}, function(msg, respond) {
  var product = msg.left * msg.right;
  respond(null, {answer: product});
});

seneca.add({
  role: 'math',
  cmd: 'factorial'
}, function(msg, respond) {
  respond(null, {answer: factorial(msg.n)});
});

/* * HERE'S A NEW MESSAGE AND I"LL DO SOMETHING WITH THE RESPONSE
* act method submits a message to act on, with 2 parameters:
** 'msg' - the (json) message object
** 'response-callback' - a function to act on any response data (corresponding
to the callback passed into the 2nd argument of the action function in act (and
with node.js typical signature (error, data))
* */
seneca.act({
  role: 'math',
  cmd: 'sum',
  left: 1,
  right: 2
}, console.log).act({
  role: 'math',
  cmd: 'product',
  left: 12,
  right: 24
}, console.log).act({
  role: 'math',
  cmd: 'factorial',
  n: 10
}, console.log);
