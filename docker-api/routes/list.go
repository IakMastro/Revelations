package routes

import (
	"context"
	"docker-management-api/lib"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/gin-gonic/gin"
)

type Container struct {
	ID       string    `json:"id"`
	Names    []string  `json:"names"`
	Ports    []uint16  `json:"ports"`
	State    string    `json:"state"`
	Status   string    `json:"status"`
	Networks []Network `json:"networks"`
	Volumes  []Volume  `json:"volumes"`
}

type Network struct {
	ID        string `json:"id"`
	IPAddress string `json:"ip_address"`
}

type Volume struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

func List(c *gin.Context) {
	cli := lib.InitDockerCli()

	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}

	var containersList []Container
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

		containersList = append(containersList, Container{})
		containersList[len(containersList)-1].ID = container.ID
		containersList[len(containersList)-1].Names = container.Names
		containersList[len(containersList)-1].Ports = ports
		containersList[len(containersList)-1].State = container.State
		containersList[len(containersList)-1].Status = container.Status
		containersList[len(containersList)-1].Networks = networks
		containersList[len(containersList)-1].Volumes = volumes
	}

	c.JSON(http.StatusOK, containersList)
}
