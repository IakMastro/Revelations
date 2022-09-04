#!/bin/bash

echo "### Checking if .env.oauth exists"
if [[ ! -f ".env.oauth" ]]; then
  echo ".env.oauth file not found..."
  echo "### Generating a new one"
  echo "# oauth server environment variables" > .env.oauth
  echo "DB_VENDOR=POSTGRES" >> .env.oauth
  echo "DB_ADDR=postgres-oauth" >> .env.oauth
  echo "DB_DATABASE=keycloak" >> .env.oauth
  echo "DB_USER=keycloak" >> .env.oauth
  echo "DB_PASSWORD=password" >> .env.oauth
  echo "Give a name for your credentials: "
  read username
  echo "KEYCLOAK_USER=${username}" >> .env.oauth
  echo "Give a password for your credentials: "
  read password
  echo "KEYCLOAK_PASSWORD=${password}" >> .env.oauth
  echo "" >> .env.oauth
  echo "# postgres oauth environment variables" >> .env.oauth
  echo "POSTGRES_DB=keycloak" >> .env.oauth
  echo "POSTGRES_USER=keycloak" >> .env.oauth
  echo "POSTGRES_PASSWORD=password" >> .env.oauth
else
  echo ".env.oauth exists"
fi

echo "### Checking if .env exists"
if [[ ! -f ".env" ]]; then
  echo ".env file not found..."
  echo "OAUTH_SERVER=ouath-server" > .env
  echo "REALM_NAME=Revelations" >> .env
  echo "CLIENT_ID=test"  >> .env
else
  echo ".env exists"
fi

echo "### Checking if node_modules exists on middleware"
if [[ ! -d "middleware/node_modules" ]]; then
  echo "No node_modules was found"
  echo "### Installing... Please wait..."
  cd middleware
  npm install
  cd ..
  echo "Done!"
else
  echo "Node modules was found"
fi

echo "### Checking if build exists on app"
if [[ ! -d "app/build" ]]; then
  echo "No build was found..."
  echo "### Checking if node_modules is found"
  cd app
  if [[ ! -d "node_modules" ]]; then
    echo "No node_modules was found"
    echo "### Installing... Please wait..."
    npm install
    echo "Done!"
  else
    echo "Node modules was found"
  fi
  npm run build
  cd ..
  echo "Done!"
else
  echo "Build exists on app"
fi

echo "### Checking if build exists on docs"
if [[ ! -d "docs/build" ]]; then
  echo "No build was found..."
  echo "### Checking if node_modules is found"
  cd docs
  if [[ ! -d "node_modules" ]]; then
    echo "No node_modules was found"
    echo "### Installing... Please wait..."
    npm install
    echo "Done!"
  else
    echo "Node modules was found"
  fi
  npm run build
  cd ..
  echo "Done!"
else
  echo "Build exists on app"
fi

echo "### Launching the application"

echo "This step may take a while if you run it the first time"

docker-compose up -d
