# Lucky Scratching Tickets
This project create Rest API that enable the client to purchase scratch tickets and use those ticket to win a prize.\
The lucky tickets currently have three options:
- Money Prize
- Vehicle Prize
- No Prize

Each of them have its own chances to apear and they are configured in "./src/models/Prize.ts"

# API 
This API uses `POST` request to communicate and HTTP response codes to indenticate status and errors.\
All responses come in standard JSON. All requests must include a `content-type` of `application/json` and the body must be valid JSON.

### Response Codes
```
200: Success
400: Bad request
404: Cannot be found
405: Method not allowed
410: Gone 
500: Server Error
```
## Requests

### Purchase Product - POST
```
endpoint - /product/purchase
```
Request - Purchase product (one or many).\
Response: the IDs of the purchased products is returned.\
Body must contains:
* amount: number # must be number bigger than 0
* productID: number # each ID represent product
	- productID = 1 is scratchTickets
#### Example
```
curl -i -X POST -H "Content-Type: application/json" -d "{\"amount\":1,\"productID\":1}"  http://localhost/product/purchase
```

### Use Product - POST
```
endpoint - /product/use
```
Request - use product functionality.\
Response: the used product results are return. ## for example the used scratchTickets return prize.\
Body must contains:
* purchasedID: string # id of product that the client buy
#### Example
```
curl -i -X POST -H "Content-Type: application/json" -d "{\"purchasedID\":\"348vdm6WFgBb44Sm92NkMX\"}"  http://localhost/product/use
```

#Deployment
- there are given three ways to deploy the appliction
##1. Deploy using local computer
```
clone the repo
cd repo
npm install
npm run build && node dist/server.js  #not recommandad
```
##2. Deploy using docker container

### on ubuntu-xenial (16):

* install docker.io and docker-compose with 
```
sudo apt install docker.io docker-compose -y
```

### on windows:
* install [Docker desktop](https://docs.docker.com/docker-for-windows/install/)
	- this installation contain already docker and docker-compose

### Build and run image from Dockerfile
* The Dockerfile is ready to use on the root folder of the repo
#### Just in case - the Dockerfile
```
FROM node:latest
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .
CMD [ "npm", "start" ]

```
And now build and run the image 
```
sudo docker build -t argus-assignment:latest .
sudo docker run -d -p 80:80 argus-assignment:latest
```
### The easy way to build and run the Dockerfile is through docker-compose
The docker-compose.yaml should be on the same folder with the Dockerfile.
#### docker-compose.yaml is already exists in the project and it look like this
```
docker-compose.yml
version: "2"
services:
  web:
    build: .
    ports:
      - "80:80"
  redis:
    image: "node:latest"
```
Once you have you have the compose yaml and the Dockerfile run:
```
docker-compose up
```

##3. Deploy using Microk8s
Microk8s is a mini kubernetes that run localy.\
We will use it to run our application on kubernetes service 
### on ubuntu-xenial (16):
install all these packages
```
sudo apt install snapd -y
sudo snap install microk8s --classic
sudo apt install docker.io docker-compose curl -y
```
Now, lets configure the microk8s, but first build the docker image like this:
```
sudo docker build . -t localhost:32000/assignmentImage:latest
```
now that we have our image lets push it to the microk8s registry
```
sudo microk8s.enable registry
sudo docker push localhost:32000/assignmentImage:latest
```
now, we will use assignment-deployment.yaml on root folder and create the service from it.\
#### the assignment-deployment.yaml
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: assignment-deployment
  labels:
    app: argus-ticket
spec:
  selector:
    matchLabels:
      app: argus-ticket
  template:
    metadata:
      labels:
        app: argus-ticket
    spec:
      containers:
      - name: luckyTicket
        image: localhost:32000/assignmentImage:latest
        ports:
        - containerPort: 80

```
almost there! only 3 commandlines!
```
sudo microk8s.kubectl apply -f assignment-deployment.yaml
sudo microk8s.start
sudo microk8s.kubectl expose deployment assignment-deployment --type=NodePort --name=ticket-service
```
the server should be running by now  :)\
use:
```
sudo microk8s kubectl get services ticket-service
```
to check which port is the service running on localhost.\
write on the shell 
```
curl -i -X POST -H "Content-Type: application/json" -d "{\"amount\":1,\"productID\":1}"  http://localhost/product/purchase
```
to test the connaction.
