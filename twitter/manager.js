var twitterConfig = require('./twitterConfig.js');
var Twit = require('twit');

var manager = {
    T: new Twit(twitterConfig.connectionConfig),
    listenOnStream: function(filter, callback) {
        if (filter == null) {
            filter = twitterConfig.streamConfig.query;
        }
        var stream = this.T.stream('statuses/filter', {track: filter})
        stream.on('tweet', function (tweet) {
            callback(tweet);
        })
    }
}

module.exports = manager;