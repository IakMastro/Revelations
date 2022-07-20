package routes

import (
	"context"
	"docker-management-api/lib"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/gin-gonic/gin"
)

func ImageList(c *gin.Context) {
	cli := lib.InitDockerCli()
	images, err := cli.ImageList(context.Background(), types.ImageListOptions{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, images)
}