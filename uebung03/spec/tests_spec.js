var frisby = require('frisby');
var server = require('../src/server.js');
frisby.create('basic hello world test')
    .get('http://localhost:8088')
        .expectBodyContains('Hallo Welt')
.toss();

//TODO: add more tests (header equals...)
//TODO: test does not finish when run via `jasmine-node spec/`
