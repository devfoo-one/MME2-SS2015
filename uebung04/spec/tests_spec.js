var frisby = require('frisby');
var server = require('../src/uebung04.js');

frisby.create('get v1 API without entity')
    .get('http://localhost:8080/api/v1')
    .expectStatus(404)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        type: 'error',
        statusCode: 404,
        msg: 'no entity requested'
    })
    .toss();

frisby.create('insert book with wrong type object')
    .post('http://localhost:8080/api/v1/', {
        title: "The Martian",
        author: "Andy Weir",
        year: "2011"}, {json: true})
    .expectStatus(404)
    .expectJSON({
        type: 'error',
        statusCode: 404,
        msg: 'Requested resource /api/v1/ not found'
    })
    .toss();


//post without entity should fail



frisby.create('insert book with wrong type object')
    .post('http://localhost:8080/api/v1/books', {
        WrongTitle: "The Martian",
        author: "Andy Weir",
        year: "2011"}, {json: true})
    .expectStatus(400)
    .toss();


//put with wrong format
//delete with wrong id
//update id
