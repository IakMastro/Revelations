FROM node:15.14.0-alpine3.10

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080
CMD ["npm", "run", "serve"]
