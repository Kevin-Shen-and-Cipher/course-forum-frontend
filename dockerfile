FROM node:19-alpine

WORKDIR /home/node/app

COPY . .
RUN npm install
EXPOSE 5173