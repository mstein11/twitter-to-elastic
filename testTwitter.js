var twitterManager = require('./twitter/manager');

twitterManager.listenOnStream(['#trump'], function(tweet) {
    console.log(tweet);
}); 