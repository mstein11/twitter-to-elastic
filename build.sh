docker build . -t twitter-to-elastic 
commitSha=$(git rev-parse HEAD)
docker tag twitter-to-elastic mariusstein77/twitter-to-elastic:$commitSha
docker push mariusstein77/twitter-to-elastic:$commitSha

echo $commitSha