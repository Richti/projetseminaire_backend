FROM node:boron
FROM library/postgres
FROM ubuntu

RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y nodejs npm
RUN apt-get install -y postgresql postgresql-contrib

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]