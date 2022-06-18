package routes

import (
	"context"
	"docker-management-api/lib"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/gin-gonic/gin"
)

type RunContainer struct {
	Tag  string `json:"tag"`
	Name string `json:"name"`
}

func Run(c *gin.Context) {
	var args RunContainer

	if err := c.ShouldBindJSON(&args); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx := context.Background()
	cli := lib.InitDockerCli()

	resp, err := cli.ContainerCreate(ctx, &container.Config{
		Image: args.Name,
	}, nil, nil, nil, args.Tag)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		panic(err)
	}

	if err := cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		panic(err)
	}

	c.JSON(http.StatusOK, gin.H{"id": resp.ID})
}
