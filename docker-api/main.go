package main

import (
	"context"
	"docker-management-api/routes"
	"github.com/docker/docker/client"
	"github.com/go-chi/chi/v5"
	"log"
	"net/http"
)

func init() {
	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		panic(err)
	}

	// Ping the Docker daemon to check if it's running
	if _, err := cli.Ping(context.Background()); err != nil {
		log.Println("Docker daemon is not running")
		panic(err)
	}
}

// Main function in which the routes are configured.
func main() {
	log.Println("Starting Docker API")
	r := chi.NewRouter()

	r.Get("/list", routes.List)
	r.Get("/images", routes.ImageList)
	r.Post("/build", routes.Build)
	r.Post("/run", routes.Run)
	r.Get("/logs/{id}", routes.Logs)
	r.Post("/stop", routes.Stop)

	http.ListenAndServe(":8080", r)
}
