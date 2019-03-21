var elasticsearch=require('elasticsearch');

var elasticHost = process.env.ELASTIC_SERVICE_NAME || "localhost:9200"

var client = new elasticsearch.Client( {  
  hosts: [
     elasticHost
  ]
});

module.exports = client; 