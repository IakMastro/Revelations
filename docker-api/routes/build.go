package routes

import (
	"context"
	"docker-management-api/lib"
	"net/http"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/archive"
	"github.com/gin-gonic/gin"
)

type BuildContainer struct {
	Name    string `json:"name"`
	TarFile string `json:"tar_file"`
}

func imageBuild(dockerClient *client.Client, container *BuildContainer) error {
	ctx, cancel := context.WithTimeout(context.Background(), 120*time.Second)
	defer cancel()

	tar, err := archive.TarWithOptions(container.TarFile, &archive.TarOptions{})
	if err != nil {
		return err
	}

	opts := types.ImageBuildOptions{
		Dockerfile: "Dockerfile",
		Tags:       []string{container.Name},
		Remove:     true,
	}
	res, err := dockerClient.ImageBuild(ctx, tar, opts)
	if err != nil {
		return err
	}

	defer res.Body.Close()

	err = lib.Print(res.Body)
	if err != nil {
		return err
	}

	return nil
}

func Build(c *gin.Context) {
	var container BuildContainer

	if err := c.ShouldBindJSON(&container); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := imageBuild(lib.InitDockerCli(), &container)
	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, gin.H{})
}
