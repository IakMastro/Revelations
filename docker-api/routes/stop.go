package routes

import (
	"context"
	"docker-management-api/lib"
	"encoding/json"
	"fmt"
	"net/http"
)

// StopContainer is a type that stops the container.
// The only field it has is the ID of the currently running container.
type StopContainer struct {
	ID string `json:"id"`
}

// Stop is a function that stops a running container.
func Stop(w http.ResponseWriter, r *http.Request) {
	var container StopContainer

	if err := json.NewDecoder(r.Body).Decode(&container); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	cli := lib.InitDockerCli()

	fmt.Print("Stopping container: ", container.ID[:10], "...")
	if err := cli.ContainerStop(ctx, container.ID, nil); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Container stopped"})
}
