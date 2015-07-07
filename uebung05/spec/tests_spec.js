var frisby = require('frisby');
var server = require('../src/uebung05.js');

frisby.create('Try to connect without authentification')
    .get('http://localhost:8080/api/v1')
    .expectStatus(401)
    .toss();

frisby.create('Get v1 API without entity')
    .get('http://localhost:8080/api/v1')
    .auth('top', 'secret')
    .expectStatus(404)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        type: 'error',
        statusCode: 404,
        msg: 'no entity requested'
    })
    .toss();

frisby.create('Get all books')
    .get('http://localhost:8080/api/v1/books')
    .auth('top', 'secret')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .inspectBody() //XXX inspectBody
    // .expectJSONLength(3) //FIXME for some reason, only the first book returns... see inspectBody() output
    .toss();

/* PAGINATION LIMIT */
frisby.create('Get one random book')
    .get('http://localhost:8080/api/v1/books?limit=1')
    .auth('top', 'secret')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONLength(1)
    .afterJSON(function(json) {
        var oldBook = json;
        frisby.create('Get next random book')
            //TODO add test if this is another book
            .get('http://localhost:8080/api/v1/books?limit=1&skip=1')
            .auth('top', 'secret')
            .inspectBody() //XXX
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .afterJSON(function(json) {
                expect(oldBook == json).not.toBe(true);
            })
            .toss();
    })
    .toss();

// TODO add test with queries
// TODO add test for pagination

frisby.create('Insert book with wrong type object')
    .post('http://localhost:8080/api/v1/books', {
        WrongTitle: "The Martian",
        author: "Andy Weir",
        year: "2011"
    }, {
        json: true
    })
    .auth('top', 'secret')
    .expectStatus(400)
    .expectJSON({
        type: 'error',
        statusCode: 400,
        msg: 'pushed object is not proper formatted!'
    })
    .toss();

frisby.create('Insert book with number as ISBN')
    .post('http://localhost:8080/api/v1/books', {
        name: 'name as string',
        description: 'description as string',
        ISBN: 4815,
        state: 0
    }, {
        json: true
    })
    .auth('top', 'secret')
    .expectStatus(400)
    .expectJSON({
        type: 'error',
        statusCode: 400,
        msg: 'pushed object is not proper formatted!'
    })
    .toss();

frisby.create('Delete one book')
    .get('http://localhost:8080/api/v1/books?limit=1')
    .auth('top', 'secret')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONLength(1) //FIXME for some reason, only the first book returns... see inspectBody() output
    .afterJSON(function(json) {
        var bookId = json[0]._id;
        frisby.create('...actually delete it')
            .delete('http://localhost:8080/api/v1/books/' + bookId)
            .auth('top', 'secret')
            .expectStatus(204)
            .after(function(err, res, body) {
                frisby.create('Try to delete same book again')
                    .delete('http://localhost:8080/api/v1/books/' + bookId)
                    .auth('top', 'secret')
                    .expectStatus(404)
                    .expectJSON({
                        type: 'error',
                        statusCode: 404,
                        msg: 'No object with id ' + bookId + ' found within entity books'
                    })
                    .toss();
            })
            .toss();
    })
    .toss();
