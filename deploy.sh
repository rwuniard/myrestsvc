docker build -t rwuniard/myrestsvc:latest -t rwuniard/multi-client:$SHA -f ./Dockerfile ./

# We have login in .travis.yaml, so we can just push it to dockerhub
docker push rwuniard/myrestsvc:latest
docker push rwuniard/myrestsvc:$SHA

# the kubectl has been set in .travis.yaml 
kubectl apply -f k8s
kubectl set image deployment/myrest-server-deployment myrestserver=rwuniard/myrestsvc:$SHA
