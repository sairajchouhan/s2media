FROM node:14-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN npx prisma migrate deploy

RUN yarn build

COPY ./admin-dev.json ./dist/admin-dev.json

CMD [ "yarn", "start" ]