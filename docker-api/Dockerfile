FROM docker:20.10.17-dind

WORKDIR /api
ENV GOPATH /go

COPY . .

RUN apk add go && go get .

EXPOSE 8080
CMD ["go", "run", "."]