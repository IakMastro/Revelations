package main

import (
	"docker-management-api/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/list", routes.List)
	router.POST("/build", routes.Build)
	router.POST("/run", routes.Run)
	router.POST("/stop", routes.Stop)
	router.Run(":8080")
}
