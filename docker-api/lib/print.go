// TODO: Add Apache Kafka or RabbitMQ to this file, instead of stdout
package lib

import (
	"bufio"
	"encoding/json"
	"errors"
	"fmt"
	"io"
)

// ErrorLine is a type that parses the errors from the Docker Engine.
type ErrorLine struct {
	Error       string      `json:"error"`
	ErrorDetail ErrorDetail `json:"errorDetail"`
}

// ErrorDetail is a type that includes the neccessary details needed to better understand the problem.
type ErrorDetail struct {
	Message string `json:"message"`
}

// Print is a function that prints to the screen the logs from the Docker Egine and produces them to a Message Broker.
func Print(rd io.Reader) error {
	var lastLine string

	// Scanner reads bit by bit the logs and is dynamic.
	scanner := bufio.NewScanner(rd)
	for scanner.Scan() {
		lastLine = scanner.Text()
		// TODO: Replace this line with the Message Broker library.
		fmt.Println(scanner.Text())
	}

	errLine := &ErrorLine{}
	json.Unmarshal([]byte(lastLine), errLine)
	if errLine.Error != "" {
		return errors.New(errLine.Error)
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	return nil
}
