/**
 * MME2 - Uebung 03 - Tom Oberhauser 798158
 */

var express = require("express");
var app = express();
/**
 * app.use() mounts a middleware (some function that handles requests and generates responses) at the given path.
 * We will use the builtin `express.static` middleware to serve static files.
 * http://expressjs.com/starter/static-files.html
 * `express.static` requires a absolute path. The name of the path of the current script is stored within `__dirname`
 * https://nodejs.org/api/all.html#all_dirname
 */
app.use('/', express.static(__dirname + '/public', {
    index: ['index.htm','index.html'] // try to find directory index (in this order)
}));
// http://expressjs.com/starter/hello-world.html
var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('server listening at http://%s:%s', host, port);
});

var appHelloWorld = express();
appHelloWorld.get('/', function(req, res){
       res.send('Hallo Welt');
});
var serverHelloWorld = appHelloWorld.listen(8088, function() {
    var host = serverHelloWorld.address().address;
    var port = serverHelloWorld.address().port;
    console.log('helloworld server listening at http://%s:%s', host, port);
});
