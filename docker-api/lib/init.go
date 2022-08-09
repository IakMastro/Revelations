package lib

import "github.com/docker/docker/client"

// InitDockerCli is a function that initiliazes the connection between the API and the Docker Engine.
func InitDockerCli() *client.Client {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	return cli
}
