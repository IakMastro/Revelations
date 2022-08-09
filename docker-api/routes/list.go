package routes

import (
	"context"
	"docker-management-api/lib"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/gin-gonic/gin"
)

// ListContainer is a type that includes the component of a container that is currently running.
type ListContainer struct {
	ID       string    `json:"id"`
	Names    []string  `json:"names"`
	Ports    []uint16  `json:"ports"`
	State    string    `json:"state"`
	Status   string    `json:"status"`
	Networks []Network `json:"networks"`
	Volumes  []Volume  `json:"volumes"`
}

// Network is a type that lists the info about the IP Address a container has.
type Network struct {
	ID        string `json:"id"`
	IPAddress string `json:"ipAddress"`
}

// Volume is a type that lists the info about the paths from the hosted machine that are mounted on the container.
type Volume struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

// List is a function that simulates the docker ps unix command.
func List(c *gin.Context) {
	cli := lib.InitDockerCli()

	// Function that returns the currently running containers.
	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}

	// Parse data and keep only the useful information
	var containersList []ListContainer
	for _, container := range containers {
		var ports []uint16

		for _, port := range container.Ports {
			ports = append(ports, port.PrivatePort)
		}

		var networks []Network
		for _, network := range container.NetworkSettings.Networks {
			networks = append(networks, Network{
				ID:        network.NetworkID,
				IPAddress: network.IPAddress,
			})
		}

		var volumes []Volume
		for _, volume := range container.Mounts {
			volumes = append(volumes, Volume{
				Name: volume.Name,
				Path: volume.Destination,
			})
		}

		containersList = append(containersList, ListContainer{
			ID:       container.ID,
			Names:    container.Names,
			Ports:    ports,
			State:    container.State,
			Status:   container.Status,
			Networks: networks,
			Volumes:  volumes,
		})
	}

	c.JSON(http.StatusOK, containersList)
}
