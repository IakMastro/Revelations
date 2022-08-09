package main

import (
	"docker-management-api/routes"

	"github.com/gin-gonic/gin"
)

// Main function in which the routes are configured.
func main() {
	router := gin.Default()
	router.GET("/list", routes.List)
	router.GET("/images", routes.ImageList)
	router.POST("/build", routes.Build)
	router.POST("/run", routes.Run)
	router.GET("/logs/:id", routes.Logs)
	router.POST("/stop", routes.Stop)
	router.Run(":8080")
}
