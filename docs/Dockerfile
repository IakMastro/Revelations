FROM node:17-alpine3.13
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "serve"]