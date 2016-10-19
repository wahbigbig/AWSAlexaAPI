##Setup:

- install docker
- `sudo docker build -t awis_demo_webserver .`
- `sudo docker run -d --name awis_demo_webserver_1 -p 8000:3000 --restart=always -e AWS_ALEXA_ACCESS_KEY='<replace your key>' -e AWS_ALEXA_SECRET='<replace your secret>' awis_demo_webserver`

##other useful commands:

- List all images
  - `sudo docker images`

- Remove image
  - `sudo docker rmi IMAGE_ID`

- List all containers
  - `sudo docker ps -a`

- Stop container
  - `sudo docker stop CONTAINER_ID`

- Remove container
  - `sudo docker rm CONTAINER_ID`
