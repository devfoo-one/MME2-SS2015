var frisby = require('frisby');
var server = require('../src/uebung04.js');

frisby.create('Get v1 API without entity')
    .get('http://localhost:8080/api/v1')
    .expectStatus(404)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        type: 'error',
        statusCode: 404,
        msg: 'no entity requested'
    })
    .toss();

frisby.create('Get books')
    .get('http://localhost:8080/api/v1/books')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONLength(3) //NOTE remove when working with real data
    .toss();


frisby.create('Insert new book')
    .post('http://localhost:8080/api/v1/books/', {
        title: "This is the title",
        author: "this is the autor",
        year: "2015",
        id: 3
    }, {
        json: true
    })
    .after(function(err, res, body) {
        frisby.create('Got one book more?')
            .get('http://localhost:8080/api/v1/books')
            .expectJSONLength(4) //NOTE remove when working with real data
            .toss();
    })
    .expectStatus(201)
    .expectJSON({
        title: 'This is the title',
        author: 'this is the autor',
        year: '2015'
    })
    .toss();

frisby.create('Insert object without entity')
    .post('http://localhost:8080/api/v1/', {
        title: "The Martian",
        author: "Andy Weir",
        year: "2011"
    }, {
        json: true
    })
    .expectStatus(404)
    .expectJSON({
        type: 'error',
        statusCode: 404,
        msg: 'Requested resource /api/v1/ not found'
    })
    .toss();

frisby.create('Insert book with wrong type object')
    .post('http://localhost:8080/api/v1/books', {
        WrongTitle: "The Martian",
        author: "Andy Weir",
        year: "2011"
    }, {
        json: true
    })
    .expectStatus(400)
    .expectJSON({
        type: 'error',
        statusCode: 400,
        msg: 'pushed object is not proper formatted!'
    })
    .toss();

frisby.create('Update book')
    .put('http://localhost:8080/api/v1/books/0', {
        title: "NEW TITLE",
        author: "Andy Weir",
        year: "2011"
    }, {
        json: true
    })
    .expectStatus(200)
    .expectJSON({
        title: "NEW TITLE",
        author: "Andy Weir",
        year: "2011",
        id: 0
    })
    .after(function(err, res, body) {
        frisby.create('book got new title?')
            .get('http://localhost:8080/api/v1/books/0')
            .expectJSON({
                title: 'NEW TITLE',
                author: 'Andy Weir',
                year: '2011',
                id: 0
            })
            .after(function(err, res, body) {
                frisby.create('Delete book with id 0')
                    .delete('http://localhost:8080/api/v1/books/0')
                    .expectStatus(200)
                    .expectJSON({
                        type: 'success',
                        statusCode: 200,
                        msg: 'deletion of books with id 0 successful'
                    })
                    .toss();
            })
            .toss();
    })
    .toss();

frisby.create('Try to update book with inproper object')
    .put('http://localhost:8080/api/v1/books/0', {
        WRONGtitle: "NEW TITLE",
        author: "Andy Weir",
        year: "2011"
    }, {
        json: true
    })
    .expectStatus(400)
    .expectJSON({
        type: 'error',
        statusCode: 400,
        msg: 'pushed object is not proper formatted!'
    })
    .toss();
