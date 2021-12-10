FROM node:14-alpine
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN npx prisma migrate deploy
RUN yarn build
CMD [ "yarn", "start" ]