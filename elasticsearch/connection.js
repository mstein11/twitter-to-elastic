var elasticsearch=require('elasticsearch');

var elasticHost = process.env.ELASTIC_SERVICE_NAME || "localhost"

var client = new elasticsearch.Client( {  
  hosts: [
    'http://' + elasticHost + ':9200/'
  ]
});

module.exports = client; 