const fs = require('fs');

var manager = {
    setUnready: function() {
        fs.writeFile("/status", "0", function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }, 
    setReady: function() {
        fs.writeFile("/status", "1", function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }
}

module.exports = manager;