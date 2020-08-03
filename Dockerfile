FROM node:alpine

WORKDIR /app
COPY package.json .
RUN yarn install --prod
COPY . .
RUN yarn run build

CMD [ "yarn", "run", "start:prod" ]