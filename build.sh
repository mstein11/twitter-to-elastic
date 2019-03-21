docker build . -t twitter-to-elastic 
docker tag twitter-to-elastic mariusstein77/twitter-to-elastic:latest
docker push mariusstein77/twitter-to-elastic:latest