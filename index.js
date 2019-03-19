#!/usr/bin/env node
'use strict';

var esManager = require('./elasticsearch/manager');
var twitterManager = require('./twitter/manager');
var applicationStatusManager = require('./applicationStatus/manager')


esManager.clusterReady(function(isReady) {
  if (isReady) {
    esManager.createIndex(_ => clusterReady());
    applicationStatusManager.setReady();
  } else {
    applicationStatusManager.setUnready();
    esManager.dispose();
  }
});

function clusterReady() {
  twitterManager.listenOnStream(null, function(tweet) {
    tweet.extended_tweet = null;
    if(tweet.retweeted_status) {
      tweet.retweeted_status.extended_tweet = null;
    }
    if (tweet.quoted_status) {
      tweet.quoted_status.extended_tweet = null;
    }

    esManager.add(tweet, function(err, res, status) {
      console.log("Added tweet with id: ", tweet.id);
    }, function(error) {
      console.log(error);
    });

  });
}