const twitterConfig = require("./twitterConfig.js");
const Twit = require("twit");

const manager = {
    T: new Twit(twitterConfig.connectionConfig),
    listenOnStream: (filter, callback) => {
        if (filter == null) {
            filter = twitterConfig.streamConfig.query;
        }
        const stream = this.T.stream("statuses/filter", { track: filter, tweet_mode: "extended" });
        stream.on("tweet", tweet => {
            callback(tweet);
        });
    },
    get: function(path, params, callback) {
        this.T.get(path, params, callback);
    },
};

module.exports = manager;
