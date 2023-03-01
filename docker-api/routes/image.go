package routes

import (
	"context"
	"docker-management-api/lib"
	"encoding/json"
	"github.com/docker/docker/api/types"
	"net/http"
)

// ImageList function returns the images that are built on the Docker engine
func ImageList(w http.ResponseWriter, r *http.Request) {
	cli := lib.InitDockerCli()
	images, err := cli.ImageList(context.Background(), types.ImageListOptions{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(images)
}
