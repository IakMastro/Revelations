---
sidebar_position: 2
---

# Docker API

The key to understand this stack is to understand this API!

## Gin

Gin is a web framework written in Go (Golang).

:::tip

You can check [the official repo](https://github.com/gin-gonic/gin) for more information on the API.

:::

## Docker Engine SDK

Docker officially suports an SDK library for Golang to be used.

:::tip

You should check [the official documentation](https://docs.docker.com/engine/api/sdk/examples/) to get ideas.

It's the easiest way to find code that can be used on this project and implement more features on the future!

:::

## API Structure

:::danger Try to follow the structure

No code will be accepted that doesn't follow the structure to the core!

:::

```
.
├── app.go
├── Dockerfile
├── go.mod
├── go.sum
├── lib
│   ├── ...
└── routes
    ...
    └── Here goes the routes
```

## Example - docker ps

An example is gonna follow that implements the ``docker ps`` unix command.

It will return all the currently running containers.

### Routes function

First things is to create the neccessary structs that will be used to produce the data to be sent.

```go
// ListContainer is a type that includes the component of a container that is currently running.
type ListContainer struct {
	ID       string    `json:"id"`
	Names    []string  `json:"names"`
	Ports    []uint16  `json:"ports"`
	State    string    `json:"state"`
	Status   string    `json:"status"`
	Networks []Network `json:"networks"`
	Volumes  []Volume  `json:"volumes"`
}

// Network is a type that lists the info about the IP Address a container has.
type Network struct {
	ID        string `json:"id"`
	IPAddress string `json:"ipAddress"`
}

// Volume is a type that lists the info about the paths from the hosted machine that are mounted on the container.
type Volume struct {
	Name string `json:"name"`
	Path string `json:"path"`
}
```

Next, let's create the function.

We need to pass through a gin Context object first through the use of a pointer. This is the way that we can tell to Go that this is a gin Route.

```go
func List(c *gin.Context) {
  ...
}
```

Everything else is gonna go inside this function.

Let's initialize the Docker CLI variable. There already exists a function for that in the lib package.

```go title=lib/init.go
package lib

import "github.com/docker/docker/client"

// InitDockerCli is a function that initiliazes the connection between the API and the Docker Engine.
func InitDockerCli() *client.Client {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	return cli
}
```

This returns the cli variable back to our List function.

```go
func list(c *gin.Context) {
  cli := lib.InitDockerCli()
  ...
}
```

Next, let's get the currently running containers using the ``ContainersList`` function that cli has available.

```go
func list(c *gin.Context) {
  ...
  containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{})
  if err != nil {
    panic(err)
  }
  ...
}
```

This returns the list of the containers.

Finally, let's parse this data and keep only the needed info that is needed.

```go
func list(c *gin.Context) {
  ...
  var containersList []ListContainer
  for _, container := range containers {
    var ports []uint16

    for _, port := range container.Ports {
      ports = append(ports, port.PrivatePort)
    }

    var networks []Network
    for _, network := range container.NetworkSettings.Networks {
      networks = append(networks, Network{
        ID:        network.NetworkID,
        IPAddress: network.IPAddress,
      })
    }

    var volumes []Volume
    for _, volume := range container.Mounts {
      volumes = append(volumes, Volume{
        Name: volume.Name,
        Path: volume.Destination,
      })
    }

    containersList = append(containersList, ListContainer{
      ID:       container.ID,
      Names:    container.Names,
      Ports:    ports,
      State:    container.State,
      Status:   container.Status,
      Networks: networks,
      Volumes:  volumes,
    })
  }

  c.JSON(http.StatusOK, containersList)
}

```

#### Complete Code

```go title=routes/init.go
package routes

import (
	"context"
	"docker-management-api/lib"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/gin-gonic/gin"
)

// ListContainer is a type that includes the component of a container that is currently running.
type ListContainer struct {
	ID       string    `json:"id"`
	Names    []string  `json:"names"`
	Ports    []uint16  `json:"ports"`
	State    string    `json:"state"`
	Status   string    `json:"status"`
	Networks []Network `json:"networks"`
	Volumes  []Volume  `json:"volumes"`
}

// Network is a type that lists the info about the IP Address a container has.
type Network struct {
	ID        string `json:"id"`
	IPAddress string `json:"ipAddress"`
}

// Volume is a type that lists the info about the paths from the hosted machine that are mounted on the container.
type Volume struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

// List is a function that simulates the docker ps unix command.
func List(c *gin.Context) {
	cli := lib.InitDockerCli()

	// Function that returns the currently running containers.
	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}

	// Parse data and keep only the useful information
	var containersList []ListContainer
	for _, container := range containers {
		var ports []uint16

		for _, port := range container.Ports {
			ports = append(ports, port.PrivatePort)
		}

		var networks []Network
		for _, network := range container.NetworkSettings.Networks {
			networks = append(networks, Network{
				ID:        network.NetworkID,
				IPAddress: network.IPAddress,
			})
		}

		var volumes []Volume
		for _, volume := range container.Mounts {
			volumes = append(volumes, Volume{
				Name: volume.Name,
				Path: volume.Destination,
			})
		}

		containersList = append(containersList, ListContainer{
			ID:       container.ID,
			Names:    container.Names,
			Ports:    ports,
			State:    container.State,
			Status:   container.Status,
			Networks: networks,
			Volumes:  volumes,
		})
	}

	c.JSON(http.StatusOK, containersList)
}
```

### Main function

Let's add our route to the main function!

```go title=main.go
package main

import (
	"docker-management-api/routes"

	"github.com/gin-gonic/gin"
)

// Main function in which the routes are configured.
func main() {
	router := gin.Default()
	router.GET("/list", routes.List)
	router.Run(":8080")
}
```

Now, the list route is ready to be used by just calling it as ``localhost:8080/list``.
