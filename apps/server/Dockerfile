FROM node:14-alpine
WORKDIR /app
COPY ./package.json  ./
COPY ./yarn.lock ./
RUN yarn install
COPY ./ ./
RUN yarn prisma:generate
CMD [ "yarn", "dev" ]

