# Fish API

Service layer implementation using node.js and http://senecajs.org
## In brief
Node.js and CRUD implementation for 'Catches'.  
Catches typically look something like,
```javascript
{
  "id": 0,
  "species": "grayling",
  "weight": "3lb",
  "length": "28cm",
  "latitude": "51.055551",
  "longitude": "-1.769147",
  "angler": "xavi",
  "photoUrls": [
    "file:///Users/jj/fyb/fish_server/src/images/bream.jpg"
  ],
  "tags": []
}
```
### The Seneca maintainers recommend,
1. separating action and service definitions
  1. business logic should go in plugins.  This same plugin should define the set of actions that implement the business functionality.
  1. the service definition should load the plugin into seneca, then listen for messages on the network    
### The Source
1. any folders named "...-example" are for illustration of the coding approach.
1. the test folder currently has a file in it called "fyb.js" that can be used to exercise the plugin code - the http server code is not required to run this.  Running `node test/fyb.js` should produce output in the form, "...["file (5.json) written OK"]..." and not produce any errors.
1. The src folder includes a "start.sh" script.  Following running `npm install` in the directory that has the package.json file in it, this script should bring up a number of node instances, each of which runs an http server.  The front.js server instance specifies the port 3000, other http listening services add themselves to the 'mesh' of http servers via the 'mesh' library.  See for example, [api-service line 168](https://github.com/josephh/fish_server/blob/cc8ed57faee66313f83f60efc82b98d647517e17/src/api/api-service.js#L168)
