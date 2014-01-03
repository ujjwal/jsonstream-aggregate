#!/usr/bin/env node

var fs = require('fs'),
    JSONStream = require('JSONStream'),
    _ = require('underscore'),
    stream = process.stdin,
    parser = JSONStream.parse(),
    aggregates = {};

stream.pipe(parser);

parser.on('root', function(obj) {
    _.each(obj, function(value, key) {
        if (_.isNumber(value)) {
            aggregates[key] = (aggregates[key] || 0) + value;
        }
    });

});

parser.on('error', function(err) {
    console.error(err);
});

parser.on('end', function() {
    console.log(JSON.stringify(aggregates, null, 4));
});
