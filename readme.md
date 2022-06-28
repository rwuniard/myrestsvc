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



To deploy to GCP:
Create GCP cluster

Assuming you have cloud install and kubectl installed in your command line. 
In GCP, it is already installed.

In GCP console you need to install helm:
* 		curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
* 		chmod 700 get_helm.sh
* 		./get_helm.sh
https://helm.sh/docs/intro/install/

Use this instruction to install nginx-ingress
Nginx-ingress can be installed using Helm. There is also an instruction to install it using kubectl

helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

https://kubernetes.github.io/ingress-nginx/deploy/

NOTES:
There is an option to deploy with LoadBalancer service.
It is stored in k8s/myrest-server-loadbalancer.yaml
That's just to demonstrate you can use load balancer in GCP.


Installing HTTPS (These steps are shown in Udemy class "Docker and Kubernetes The Complete Guide by Stephen Grider")
----------------
We will be using letsencrypt 
###First you need to install cert manager.
The certificate manager will do a handshake with letsencrypt to ensure you are the owner of the domain and issuing the certificate based on the info responded in the handshake.

First install the cert-manager in your k8s cluster (in GCP)
Add the Jetstack Helm repository

*helm repo add jetstack https://charts.jetstack.io*

Update your local Helm chart repository cache:

*helm repo update*

Install the cert-manager Helm chart:

*helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.8.0 \
  --set installCRDs=true*

The cert-manager documentation on the installation

https://cert-manager.io/docs/installation/helm/#steps

You should be seeing additional pods and svc in your cluster.
kubectl get pod -n cert-manager

### Setup your domain and configure the DNS
Buy the domain that you want. You can get it from gcp (domains.google.com)

Configure the DNS to point to the IP specified in the ingress load balancer.
You can find the ip address by running this command:
*kubectl get ingress*

Configure the DNS with these settings.
ronsonw.com	A	1 hour	
xx.xx.xx.xx(IP Addr)
www.ronsonw.com	CNAME	1 hour	
ronsonw.com.

### Create issuer.yaml
The certificate manager needs issuer.yaml and certificate.yaml to initiate the handshake with letsecnrypt.

### Create certificate.yaml
Please take a look at the certificate.yaml file.

### Deploy issuer.yaml and certificate.yaml
deploy it with kubectl command.
After the deployment is successful, you can check whether the cert-manager has successfully obtained the certificate.
*kubectl get certificates
kubectl describe certificates*

Check if it has the secret
*kubectl get secrets*
### Modify the ingress-service.yaml
Please see the ingress-service.yaml with comments in it to explain what the addition changes to the original configuration.
Deploy it with kubectl apply

Then you should be able to go to 
yourdomain.com/test
www.yourdomain.com/test
It should return a result from the rest service.
