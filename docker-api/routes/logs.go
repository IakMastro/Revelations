package routes

import (
	"context"
	"docker-management-api/lib"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/gin-gonic/gin"
)

// Function that prints the logs of a container.
func Logs(c *gin.Context) {
	ctx := context.Background()
	cli := lib.InitDockerCli()

	options := types.ContainerLogsOptions{ShowStdout: true, ShowStderr: true, Follow: true}
	out, err := cli.ContainerLogs(ctx, c.Param("id"), options)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	lib.Print(out)
}