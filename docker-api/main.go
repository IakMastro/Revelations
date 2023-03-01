package main

import (
	"docker-management-api/routes"
	"net/http"

	"github.com/go-chi/chi/v5"
	"log"
)

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
