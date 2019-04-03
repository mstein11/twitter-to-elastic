var twitterManager = require('./twitter/manager');

twitterManager.listenOnStream(['#maga'], function(tweet) {
    console.log(tweet);
}); 