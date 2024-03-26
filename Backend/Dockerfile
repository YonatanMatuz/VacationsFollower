FROM node:18-alpine3.18

RUN npm i -g ts-node

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . /app

ENTRYPOINT npm start