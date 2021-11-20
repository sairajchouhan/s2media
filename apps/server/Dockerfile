FROM node:15-alpine
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build
CMD [ "yarn", "start" ]