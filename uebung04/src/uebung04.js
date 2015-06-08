// MME2 - Uebung 04 - Tom Oberhauser - 798158
// this module provides a REST interface on localhost:8080/api/v1

var express = require("express");
var bodyParser = require('body-parser');
var errorJSON = require("./errorJSON.js");
var dummyBooks = require("./dummyBooks.js");
var data = {
    books: dummyBooks
};
var app = express();
var routerV1 = express.Router();

// route /entity
routerV1.route('/:entity/')

    // route /entity GET
    .get(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        if (data[entity] !== undefined) {
            res.status(200).send(data[entity].getAll());
        } else {
            errorJSON.send(new errorJSON.Error("error", 404, "Requested entity " + entity + " not found"), res);
        }
    })

    // route /entity POST
    .post(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var postedObject = req.body; //bodyParser middleware automatically parses application/json posts into JSON
        if(data[entity].push(postedObject)) {
            errorJSON.send(new errorJSON.Error("success", 201, "insert into " + entity + " successful"), res);
        } else {
            errorJSON.send(new errorJSON.Error("error", 400, "pushed object is not proper formatted!"), res);
        }
    });

// route /entity/id
routerV1.route('/:entity/:id')

    // route /entity/id GET
    .get(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var id = req.params.id;
        if (data[entity] !== undefined) {
            var requestedObject = data[entity].getById(id);
            if (requestedObject) {
                res.status(200).send(requestedObject);
            } else {
                errorJSON.send(new errorJSON.Error("error", 404, "No object with id " + id + " found within entity " + entity), res); //is this necessary?
            }
        } else {
            errorJSON.send(new errorJSON.Error("error", 404, "Requested entity " + entity + " not found"), res);
        }
    })

    // route /entity/id PUT
    .put(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var id = req.params.id;
        var postedObject = req.body;
        res.send('PUT ' + entity + ' with ' + id); //TODO implement me
        // TODO dont forget to send http success code here
    })

    // route /entity/id DELETE
    .delete(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var id = req.params.id;
        //TODO implement me
    });

// for parsing application/json
app.use(bodyParser.json());

//connect router middleware
app.use('/api/v1', routerV1);

//default route http://stackoverflow.com/questions/22673218/default-route-in-express-js
app.use(function(req, res) {
    errorJSON.send(new errorJSON.Error("error", 404, "Requested resource " + req.originalUrl + " not found"), res);
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('server listening at http://%s:%s', host, port);
});
