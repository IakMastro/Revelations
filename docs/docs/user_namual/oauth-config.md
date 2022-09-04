---
sidebar_position: 2
---

# Configuration Authentication Server

This is a guide on how to configurate the oauth server, so it will work with the Revelation platform!

## Environment configuration

Create a ``.env.oauth`` file in the root of the project and add this environment variables:

```shell title=.env.oauth
# oauth server environment variables
DB_VENDOR=POSTGRES
DB_ADDR=postgres-oauth
DB_DATABASE=keycloak
DB_USER=keycloak
DB_SCHEMA=public
DB_PASSWORD=password
KEYCLOAK_USER=admin # change this to your liking
KEYCLOAK_PASSWORD=pass # change this to your liking

# postgres oauth environment variables
POSTGRES_DB=keycloak
POSTGRES_USER=keycloak
POSTGRES_PASSWORD=password
```

## Login

Login as ``admin`` with password ``pass``. You are free to change the username and the password in the 
``.env.oauth`` file.

## Instructions

1. Create a new realm called Revelations
2. Go to Realm Settings and login and enable the configuration you want
3. Go to Clients and create a new client with the name ``react-js``
4. Configuration is ready and the oauth server is ready to be used!
