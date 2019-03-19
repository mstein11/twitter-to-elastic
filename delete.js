#!/usr/bin/env node
'use strict';
var esManager = require('./elasticsearch/manager');

esManager.removeIndex("twitter", function(res) {
    console.log("deleted successfully")
});