FROM golang:1.18.1-alpine3.15

WORKDIR /api

COPY app.go .
COPY go.mod .

RUN go get .

EXPOSE 8080
CMD ["go", "run", "."]