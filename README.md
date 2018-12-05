# fish_server

Service layer implementation with http://senecajs.org
The maintainers recommend,
1. separating action and service definitions
  1. business logic should go in plugins.  This same plugin should define the set of actions that implement the business functionality.
  1. the service definition should load the plugin into seneca, then listen for messages on the network    
  
  
