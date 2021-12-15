FROM node:14-alpine

WORKDIR /app

COPY ./package.json  ./

COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./ ./


RUN yarn build

COPY ./admin-dev.json ./dist/admin-dev.json

COPY ./admin.json ./dist/admin.json

CMD [ "yarn", "start" ]