package routes

import (
	"context"
	"docker-management-api/lib"
	"fmt"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/go-connections/nat"
	"github.com/gin-gonic/gin"
)

// RunContainer is a type that enables an image to run. It has tag and name as it's fields.
type RunContainer struct {
	Tag  string `json:"tag"`
	Name string `json:"name"`
}

// Run is a function that runs an image based on a few parameters that the user has given from the web app.
// In the future, the port could also be a part of info that is extracted from the front end.
func Run(c *gin.Context) {
	var args RunContainer

	if err := c.ShouldBindJSON(&args); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx := context.Background()
	cli := lib.InitDockerCli()

	resp, err := cli.ContainerCreate(
		ctx,
		&container.Config{
			Image: args.Name,
			ExposedPorts: nat.PortSet{nat.Port("8000/tcp"): {}},
		},
		&container.HostConfig{
			PortBindings: nat.PortMap{
				"8000": []nat.PortBinding{
					{
						HostIP: "0.0.0.0",
					},
				},
			},
			Resources: container.Resources{
				Memory:     1024 * 1000000,
			},
		},
		nil,
		nil,
		args.Tag,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		panic(err)
	}

	if err := cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		panic(err)
	}

	// TODO: Try to find a better workaround for this problem.
	err = cli.NetworkConnect(ctx, "98dff6e1d6f2e8826858f480bb2a9f71bc10aeabc3437dd283d7b085981fbad5", resp.ID, &network.EndpointSettings{})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		panic(err)
	}

	c.JSON(http.StatusOK, gin.H{"id": resp.ID})
}
