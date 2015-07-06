// MME2 - Uebung 05 - Tom Oberhauser - 798158
// this module provides a REST interface on localhost:8080/api/v1

var mongojs = require('mongojs');
var db = mongojs('mydb', ['books']);
var express = require("express");
var bodyParser = require('body-parser');
var errorJSON = require("./errorJSON.js");
var _ = require("underscore");
var dummyBooks = require("./dummyBooks.js");
dummyBooks.populateDb(db); //create dummy data
var app = express();
var routerV1 = express.Router();

/**
 * tests if an id is a valid mongodb-id
 * @param  {String} id      id
 * @param  {function} success callback if id is valid
 * @param  {function} fail    callback if id is not valid
 */
var executeIfValidObjectId = function(id, success, fail) {
    try {
        mongojs.ObjectId(id);
    } catch(e) {
        fail();
        return;
    }
    success();
    return;
};

routerV1.route('')
    .get(function(req, res) {
        errorJSON.send(new errorJSON.Error("error", 404, "no entity requested"), res);
    });

// route /entity
routerV1.route('/:entity/')

    // route /entity GET
    .get(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var paginationLimit = Number(_.defaults(_.pick(req.query, 'limit'), {limit: 0}).limit);
        var paginationSkip = Number(_.defaults(_.pick(req.query, 'skip'), {skip: 0}).skip);
        // get query parameters for wildcard search
        var queryWildcard = _.mapObject(_.pick(req.query,'name', 'description', 'ISBN'), function(val, key){
            return new RegExp(val, 'i');
        });
        // get query parameters for number search (must not be converted to RegEx)
        var queryNumbers = _.mapObject(_.pick(req.query, 'state'), function(val, key) {
            return Number(val);
        });
        // combine to one query
        query = _.extend(queryWildcard, queryNumbers);
        if (entity === 'books') {
            db.books.find(query).limit(paginationLimit).skip(paginationSkip, function(err, docs) {
                res.status(200).send(docs);
            });
        } else {
            errorJSON.send(new errorJSON.Error("error", 404, "Requested entity " + entity + " not found"), res);
        }
    })

    // route /entity POST
    .post(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var postedObject = req.body; //bodyParser middleware automatically parses application/json posts into JSON
        var checkedObject = dummyBooks.checkObject(postedObject);
        if (entity === 'books') {
            if (checkedObject !== null) {
                db.books.insert(checkedObject, function(err, docs) {
                    res.status(201).json(docs);
                });
            } else {
                errorJSON.send(new errorJSON.Error("error", 400, "pushed object is not proper formatted!"), res);
            }
        }
    });

// route /entity/id
routerV1.route('/:entity/:id')

    // route /entity/id GET
    .get(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var id = req.params.id;
        var idFail = function() {
            errorJSON.send(new errorJSON.Error("error", 400, id + " is not a valid database id!"), res);
        };
        var idSuccess = function() {
            if (entity === 'books') {
                db.books.findOne({_id: mongojs.ObjectId(id)}, function(err, docs) {
                    if(!docs) {
                        errorJSON.send(new errorJSON.Error("error", 404, "No object with id " + id + " found within entity " + entity), res);
                    } else {
                        res.status(200).send(docs);
                    }
                });
            } else {
                errorJSON.send(new errorJSON.Error("error", 404, "Requested entity " + entity + " not found"), res);
            }
        };
        executeIfValidObjectId(id, idSuccess, idFail);
    })

    // route /entity/id PUT
    // TODO implement me
    .put(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var id = req.params.id;
        var postedObject = req.body;
        var checkedObject = dummyBooks.checkObject(postedObject);
        var idFail = function() {
            errorJSON.send(new errorJSON.Error("error", 400, id + " is not a valid database id!"), res);
        };
        var idSuccess = function() {
            if (entity === 'books') {
                // check if id is in database
                db.books.count({_id: mongojs.ObjectId(id)}, function(err, n) {
                    if(n === 1) {
                        if (checkedObject !== null) {
                            db.books.update({_id: mongojs.ObjectId(id)}, checkedObject, function() {
                                // show updated object
                                db.books.findOne({_id: mongojs.ObjectId(id)}, function(err, docs) {
                                    res.status(201).send(docs);
                                });
                            });
                        } else {
                            errorJSON.send(new errorJSON.Error("error", 400, "pushed object is not proper formatted!"), res);
                        }
                    } else {
                        errorJSON.send(new errorJSON.Error("error", 404, "No object with id " + id + " found within entity " + entity), res);
                    }
                });
            } else {
                errorJSON.send(new errorJSON.Error("error", 404, "Requested entity " + entity + " not found"), res);
            }
        };
        executeIfValidObjectId(id, idSuccess, idFail);
    })

    // route /entity/id DELETE
    // TODO implement me
    .delete(function(req, res) {
        var entity = req.params.entity.toLowerCase();
        var id = req.params.id;
        if (data[entity].delete(id)) {
            errorJSON.send(new errorJSON.Error("success", 200, "deletion of " + entity + " with id " + id + " successful"), res);
        } else {
            errorJSON.send(new errorJSON.Error("error", 400, "No object to delete with id " + id + " found within entity " + entity), res);
        }
    }
);

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
