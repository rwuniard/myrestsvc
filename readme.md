-   to initialize all the modules type
    *npm i install*
-   to run type
    *npm run dev*


    Running with Skaffold
    docker build -t rwuniard/myrestserver -f Dockerfile.dev .
    docker push rwuniard/myrestserver
    Now you have the image in Docker hub, then you can start your minikube
    minikube start
    skaffold dev


    NOTES: 
    To test with step by step
*   docker build -t rwuniard/myrestserver -f Dockerfile.dev .
    docker run -p 3000:3000 rwuniard/myrestserver*
    Go to your browser type this URL: localhost:3000/test
    You should see text: This is a test
    To check you image
    docker image ls

    Then deploy and test with kubectl
    kubectl apply -f k8s
    Notes: you need to have myrest-server-node-port.yaml so you can access it from your browser.
           port: 3050 -> for other pod inside node to access server
           targetPort: 3000 -> this is what your the nodejs is listening to
           nodePort: 31515 -> this is what you need to put in your URL
    kubectl get pods -> to check if the pods are deployed correctly
    kubectl get service -> to check if the service is deployed correctly

    minikube ip 
    Then you should get the ip and put that ip in the browser ip:31515/test

    If everything works, then you can delete it 
    kubectl delete -f k8s

    then ready to deploy with skaffold
    skaffold dev

    then check with these commands:
    kubectl get pods -> to check if the pods are deployed correctly
    kubectl get service -> to check if the service is deployed correctly
    minikube ip 
    Then you should get the ip and put that ip in the browser ip:31515/test


