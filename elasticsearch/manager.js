var client = require('./connection.js');


clusterReadyTries = 0;
var manager = {
    add: function(toAdd, callback, errCallback) {
        client.index({
            index: 'twitter',
            type: 'tweet',
            id: toAdd.id,
            body: toAdd
          })
          .then(callback)
          .catch(errCallback)
    },
    remove: function(toRemove, callback) {
      throw "not implemented";
    },
    search: function(query, callback) {
      client.search(query, function(err,resp,status) {  
        console.log("-- Client Search --");
        console.log(resp);
      });
    
    },
    removeIndex: function(toRemove, callback) {
      client.indices.delete({index: toRemove})
        .then(callback);
    },
    clusterReady: function(callback) {
      client.cluster.health({},function(err, resp) { 
        if (err == null && resp.status == "green") {
          clusterReadyTries = 0;
          callback(true);
        } 
        if (clusterReadyTries >= 5) {
          callback(false);
          return;
        }
        clusterReadyTries++;
        console.warn("--- Cluster Not Ready - Waiting 5 Seconds to try again for maximum of 5 times");
        setTimeout(function() {
          manager.clusterReady(callback);
        }, 5000);        
      });
    },
    createIndex: function(callback) {
      client.indices.exists({ index: 'twitter'})
        .then(function(exists) {
          if (exists) {
            callback();
            return;
          }
          client.indices.create({ index: 'twitter',}).catch(function (error) {
            console.log("-- Error Creating Index --");
            console.trace(error.message);
          }).then(function (res) {
            console.log("-- Created Index --");
            callback();
          });
      }).catch(function(reason) {
        console.log(reason);
      });
    },
    dispose: function() {
      client.close();
      console.log("client closed")
    } 
};

module.exports = manager;