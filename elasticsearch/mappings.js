var indexes = require('./indexes.js');

var mappings = {};
mappings[indexes.tweetIndex] = {
    index: indexes.tweetIndex,
    type: 'tweet',
    body: {
    properties: { 
        created_at: { 
          "type":   "date",
          "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis||EEE MMM dd HH:mm:ss ZZ YYYY"
         }
    }
  } 
}
mappings[indexes.userIndex] = {
    index: indexes.userIndex,
    type: 'user',
    body: {
    properties: { 
        created_at: { 
          "type":   "date",
          "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis||EEE MMM dd HH:mm:ss ZZ YYYY"
         }
    }
  } 
}

module.exports = mappings;