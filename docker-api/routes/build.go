package routes

import (
	"context"
	"docker-management-api/lib"
	"fmt"
	"net/http"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/archive"
	"github.com/gin-gonic/gin"
)

// BuildImage is a type that includes the two neccessary components to build a new Image.
// Those two components are the name of the image and the path in the local file system.
// The files are saved by the Middleware API on a common mounted path
type BuildImage struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

// imageBuildFunction is a private method that build the image.
// If something will go wrong, it returns the error, otherwise it returns nill.
func imageBuildFunction(dockerClient *client.Client, imageBuild *BuildImage) error {
	// Create the background context
	ctx, cancel := context.WithTimeout(context.Background(), 120*time.Second)
	defer cancel()

	// Create the path and then compress it to tar
	path := fmt.Sprintf("/files/%s", imageBuild.Path)
	tar, err := archive.TarWithOptions(path, &archive.TarOptions{})
	if err != nil {
		return err
	}

	opts := types.ImageBuildOptions{
		Dockerfile: "Dockerfile",
		Tags:       []string{imageBuild.Name},
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

// Build function is a public class that calls the imageBuildFunction and returns a message to the API.
func Build(c *gin.Context) {
	var imageBuild BuildImage

	if err := c.ShouldBindJSON(&imageBuild); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := imageBuildFunction(lib.InitDockerCli(), &imageBuild)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Image was built successfully"})
}
