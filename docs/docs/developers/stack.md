---
sidebar_position: 1
---

# Stack

A quick overview of the stack that runs the Revelations platform!

## Frontend

For the frontend, it uses ReactJS as it's main framework implemented in TypeScript. The core packages that is being used are:

* **TailwindCSS** to create a modern, responsive environment.
* **Redux Toolkit** to make state management as easy as possible while staying flexible.
* **React Query** to manage the state of the queries without the use of Redux.
* **SCSS** for custom styling that needs to be done.

## Backend

For the backend, it follows a microservice logic with very small APIs and a bigger one that serves as a middleware. These are implemented in:

* **Middleware**: ExpressJS in TypeScript. It also uses Mongoose to connect to a Mongo database.
* **Docker API**: Gin in Golang. It uses the official Docker library to connect to the Docker Engine and it's designed to be as fast as possible.
* **Dataset API**: Flask in Python. It just reads the content from a file based on it's extention. It uses Pandas and Numpy.

## Databases

For the databases, it uses two. One is a PostgreSQL that is connected to the Authentication Server and it manages the users and the other is a MongoDB that manages the datasets. More could be added to the future.

## Authentication Server

The authentication server in this stack is keycloak, which is run and mantained by the Revelations team.

## More info

If you want to find more info on this frameworks and libraries, please refer to the official documentation to each of the projects.
