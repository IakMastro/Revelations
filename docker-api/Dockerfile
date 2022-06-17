FROM docker:20.10.17-dind

WORKDIR /api
ENV GOPATH /go

RUN apk add go

COPY . .

RUN go get .

EXPOSE 8080
CMD ["go", "run", "."]