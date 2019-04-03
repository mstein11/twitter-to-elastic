var twitterConfig = require('./twitterConfig.js');
var Twit = require('twit');

var manager = {
    T: new Twit(twitterConfig.connectionConfig),
    listenOnStream: function(filter, callback) {
        if (filter == null) {
            filter = twitterConfig.streamConfig.query;
        }
        var stream = this.T.stream('statuses/filter', {track: filter, tweet_mode: "extended" })
        stream.on('tweet', function (tweet) {
            callback(tweet);
        })
    },
    get: function (path, params, callback) {
        this.T.get(path, params, callback);
    }
}

module.exports = manager;