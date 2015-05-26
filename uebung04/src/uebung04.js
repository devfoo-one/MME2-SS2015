// MME2 - Uebung 04 - Tom Oberhauser - 798158

var express = require("express");
var errorJSON = require("./errorJSON.js");
var dummyBooks = require("./dummyBooks.js");
var data = {
    books: dummyBooks.books
};
var app = express();
var routerV1 = express.Router();

routerV1.route('/:entity/')
    .get(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        if (data[entity] !== undefined) {
            res.send(data[entity]);
        } else {
            errorJSON.send(new errorJSON.Error("error", 404, "Requested entity " + entity + " not found"), res);
        }
    })
    .post(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        res.send('POST ' + entity); //TODO implement me
    });

routerV1.route('/:entity/:id')
    .get(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var id = req.params.id;
        if (data[entity] !== undefined) {
            if (data[entity][id] !== undefined) {
                res.send(data[entity][id]);
            } else {
                errorJSON.send(new errorJSON.Error("error", 404, "No object with id " + id + " found within entity " + entity), res); //is this necessary?
            }
        } else {
            errorJSON.send(new errorJSON.Error("error", 404, "Requested entity " + entity + " not found"), res);
        }
    })
    .put(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var id = req.params.id;
        res.send('PUT ' + entity + ' with ' + id); //TODO implement me
    })
    .delete(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var id = req.params.id;
        res.send('DELETE ' + entity + ' with ' + id); //TODO implement me
    });

//connect router middleware
app.use('/api/v1', routerV1);

//default route http://stackoverflow.com/questions/22673218/default-route-in-express-js
app.use(function(req, res) {
    errorJSON.send(new errorJSON.Error("error", 404, "Requested resource " + req.originalUrl + " not found"), res);
});

var server = app.listen(8080, function() {
    var host = server.address()
        .address;
    var port = server.address()
        .port;
    console.log('server listening at http://%s:%s', host, port);
});
