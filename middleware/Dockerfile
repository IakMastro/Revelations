FROM node:17-alpine3.13

WORKDIR /api

COPY . .

RUN yarn install

EXPOSE 5000
CMD ["yarn", "serve"]