FROM node:20.4.0-alpine

COPY . .

RUN npm i

ENTRYPOINT [ "node", "index.js" ]