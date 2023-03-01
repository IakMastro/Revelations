package routes

import (
	"context"
	"docker-management-api/lib"
	"github.com/docker/docker/api/types"
	"github.com/go-chi/chi/v5"
	"net/http"
)

// Function that prints the logs of a container.
func Logs(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	cli := lib.InitDockerCli()

	options := types.ContainerLogsOptions{ShowStdout: true, ShowStderr: true, Follow: true}
	out, err := cli.ContainerLogs(ctx, chi.URLParam(r, "id"), options)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	lib.Print(out)
}
