require('seneca')()
  .client(4321) // default transport is http
  .act('role:math,cmd:sum,left:1,right:2', console.log);
