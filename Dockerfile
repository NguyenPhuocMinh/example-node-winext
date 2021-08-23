FROM node:alpine

WORKDIR /appcl

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "node", "server.js" ]
