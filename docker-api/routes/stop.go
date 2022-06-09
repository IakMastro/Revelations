package routes

import (
	"context"
	"docker-management-api/lib"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type StopContainer struct {
	ID string `json:"id"`
}

func Stop(c *gin.Context) {
	var containers []StopContainer

	if err := c.ShouldBindJSON(&containers); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx := context.Background()
	cli := lib.InitDockerCli()

	for _, container := range containers {
		fmt.Print("Stopping container: ", container.ID[:10], "...")
		if err := cli.ContainerStop(ctx, container.ID, nil); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusOK, gin.H{"message": "Containers stopped"})
		}
	}
}
