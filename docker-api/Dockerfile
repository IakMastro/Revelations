FROM golang:alpine as build 
WORKDIR /build
COPY go.mod go.sum ./
RUN go mod download
COPY . .  
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -a -installsuffix cgo -o docker-api .

FROM docker:20.10.17-alpine3.16
WORKDIR /api
COPY --from=build /build/docker-api .
EXPOSE 8080
ENTRYPOINT ["./docker-api"]

