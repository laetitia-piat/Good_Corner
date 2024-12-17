FROM node:lts-alpine

RUN apk add curl

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY tsconfig.json tsconfig.json
COPY good_corner.sqlite good_corner.sqlite
COPY src src

CMD npm start