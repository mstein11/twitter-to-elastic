var twitterManager = require('./twitter/manager');

twitterManager.get("statuses/user_timeline", {screen_name: "avibebert"}, function(err, tweet, response) {
    console.log(tweet);
}); 
