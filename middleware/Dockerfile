FROM node:17-alpine3.13

WORKDIR /api
ENV PORT 5000

COPY . .

RUN npm install

EXPOSE 5000
CMD ["npm", "run", "serve"]