#!/usr/bin/env node
'use strict';
var esManager = require('./elasticsearch/manager');
var twitterManager = require('./twitter/manager');
var indexes = require('./elasticsearch/indexes');


esManager.clusterReady(function(isReady) {
  if (isReady) {
    esManager.createIndex(_ => clusterReady());
  } else {
    esManager.dispose();
  }
});

function clusterReady() {
  twitterManager.listenOnStream(null, function(tweet) {
    
    var tweetsAndUsers = prepareTweet(tweet);

    for (let i = 0; i < tweetsAndUsers.tweets.length; i++) {
      esManager.add(indexes.tweetIndex, tweetsAndUsers.tweets[i], function(res) {
        console.log("Added/Updated tweet with id: ", res._id, "(" + (i + 1) + "/" + tweetsAndUsers.tweets.length + ")");
      }, function(error) {
        console.log(error);
      });
    }

    for (var i = 0; i < tweetsAndUsers.users.length; i++) {
      esManager.add(indexes.userIndex, tweetsAndUsers.users[i], function(result) {
        console.log("User added/updated with id: ", result._id);
      }, function(error) {
        console.log(error);
      });
      
    }
  });
}

var prepareTweet = function(tweet) {
  var user = tweet.user;
  tweet.user = {
    id: user.id,
    name: user.name,
    screen_name: user.screen_name,
    location: user.location,
    url: user.url,
    description: user. description
  };

  var tweets = [];
  var users = [];
  tweets.push(tweet);
  users.push(user);

  if(tweet.retweeted_status) {
    var retweet = tweet.retweeted_status;
    tweet.retweeted_status = {
      id: retweet.id
    };
    var res = prepareTweet(retweet);
    tweets = tweets.concat(res.tweets);
    users = users.concat(res.users);
  }

  if (tweet.quoted_status) {
    var quote = tweet.quoted_status;
    tweet.quoted_status = {
      id: quote.id
    };
    var res = prepareTweet(quote);
    tweets = tweets.concat(res.tweets);
    users = users.concat(res.users);
  }

  var result = {
    users: users,
    tweets: tweets
  }

  return result;
}