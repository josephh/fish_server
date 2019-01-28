require('seneca')()

  .use('../math-module')

  // listen for role:math messages
  // IMPORTANT: must match client
  .listen({ type: 'tcp', pin: 'role:math' });
