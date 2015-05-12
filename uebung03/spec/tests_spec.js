var frisby = require('frisby');
var server = require('../src/server.js');
frisby.create('basic hello world test')
    .get('http://localhost:8088')
        .expectBodyContains('Hallo Welt')
        .expectStatus(200)
.toss();

frisby.create('document server test')
    .get('http://localhost:8080')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/html')
.toss();
