// MME2 - Uebung 04 - Tom Oberhauser - 798158

var express = require("express");
var app = express();
var routerV1 = express.Router();

routerV1.route('/:entity/')
    .get(function(req, res) {
        var entity = req.params.entity;
        res.send('getting all ' + entity);
    })
    .post(function(req, res) {
        var entity = req.params.entity;
        res.send('POST ' + entity);
    });

routerV1.route('/:entity/:id')
    .get(function(req, res) {
        var entity = req.params.entity;
        var id = req.params.id;
        res.send('GET ' + entity + ' with ' + id);
    })
    .put(function(req, res) {
        var entity = req.params.entity;
        var id = req.params.id;
        res.send('PUT ' + entity + ' with ' + id);
    })
    .delete(function(req, res) {
        var entity = req.params.entity;
        var id = req.params.id;
        res.send('DELETE ' + entity + ' with ' + id);
    });

//connect router middleware
app.use('/api/v1', routerV1);

//default route http://stackoverflow.com/questions/22673218/default-route-in-express-js
app.use(function(req, res) {
    res.status(404)
        .send({
            type: "error",
            statusCode: 404,
            msg: "Requested resource " + req.originalUrl + " not found"
        });
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('server listening at http://%s:%s', host, port);
});
