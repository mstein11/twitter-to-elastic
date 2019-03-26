var client = require('./connection.js');
var mappings = require('./mappings.js');
var indexes = require('./indexes.js');

clusterReadyTries = 0;
var manager = {
    add: function(index, toAdd, callback, errCallback) {
        if (!indexes.allIndexes.includes(index)) {
          throw "Index " + index + " doesn't exist";
        }

        var type = mappings[index].type;
        client.index({
            index: index,
            type: type,
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
        if (err == null && resp.status != "red") {
          clusterReadyTries = 0;
          callback(true);
          return;
        } 
        if (clusterReadyTries >= 5) {
          callback(false);
          return;
        }
        clusterReadyTries++;
        console.warn("--- Cluster Not Ready - Waiting 10 Seconds to try again for maximum of 5 times. Got the following error:");
        console.warn(resp);
        setTimeout(function() {
          manager.clusterReady(callback);
        }, 10000);        
      });
    },
    createIndex: function(callback) {

      for (var i = 0; i < indexes.allIndexes.length; i++) {
         let currIndex = indexes.allIndexes[i];

        client.indices
          .exists({ index: currIndex })
          .then(function (exists) {
            if (exists) {
              callback();
              return;
            }

            client.indices.create({ index: currIndex})
            .catch(function (error) {
              console.log("-- Error Creating Index --");
              console.trace(error.message); 
            })
            .then(function (res) {
              console.log("-- Created Index " + currIndex + " ---");
              client.indices.putMapping(mappings[currIndex])
                .then(function() 
                { 
                  console.log("-- Put Mapping --"); 
                  callback();
                }).catch(function () { console.log("--- Error creating Index. ABORTING"); 
              });
            });
          });
      }
    },
    dispose: function() {
      client.close();
      console.log("client closed")
    } 
};

module.exports = manager;