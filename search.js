#!/usr/bin/env node
'use strict';
var esManager = require('./elasticsearch/manager');

esManager.search({}, function(res) {
    console.log("deleted successfully")
});