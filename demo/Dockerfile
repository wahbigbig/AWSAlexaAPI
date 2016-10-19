FROM node:5.11
COPY . /demo
WORKDIR /demo
RUN apt-get update \
    && apt-get install -y vim 
RUN npm install
CMD npm start
