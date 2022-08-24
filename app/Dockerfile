FROM node:17-alpine3.13 as build
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM node:17-alpine3.13
WORKDIR /app
COPY --from=build /build/build .
RUN npm install -g serve
EXPOSE 3000
#ENTRYPOINT [ "serve -s build -l 3000" ]
CMD ["serve"]