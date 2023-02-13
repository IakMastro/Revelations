#!/bin/bash

if ! command -v docker-compose > /dev/null; then
  echo "Error: docker-compose is not installed. Checking for modern docker version.."
  exit 1
fi


echo "### Checking if .env.oauth exists"
if [[ ! -f ".env.oauth" ]]; then
  read -r -p "Give keycloak username: "  username
  echo "KEYCLOAK_USER=${username}" >> .env.oauth

  read -r -s -p "Give keycloak password: " password
  echo "KEYCLOAK_PASSWORD=${password}" >> .env.oauth
else
  echo ".env.oauth exists"
fi

echo "### Checking if node_modules exists on middleware"
if [[ ! -d "middleware/node_modules" ]]; then
  echo "No node_modules was found"
  echo "### Installing... Please wait..."
  (
      cd middleware || exit 1
      npm install
  )
  echo "Done!"
else
  echo "Node modules was found"
fi

echo "### Checking if build exists on app"
if [[ ! -d "app/build" ]]; then
  echo "No build was found..."
  echo "### Checking if node_modules is found"
  (
      cd app || exit 1
      if [[ ! -d "node_modules" ]]; then
        echo "No node_modules was found"
        echo "### Installing... Please wait..."
        npm install
        echo "Done!"
      else
        echo "Node modules was found"
      fi
      npm run build
  )
  echo "Done!"
else
  echo "Build exists on app"
fi

echo "### Checking if build exists on docs"
if [[ ! -d "docs/build" ]]; then
  echo "No build was found..."
  echo "### Checking if node_modules is found"
  (
      cd docs || exit 1
      if [[ ! -d "node_modules" ]]; then
        echo "No node_modules was found"
        echo "### Installing... Please wait..."
        npm install
        echo "Done!"
      else
        echo "Node modules was found"
      fi
      npm run build
  )
  echo "Done!"
else
  echo "Build exists on app"
fi

echo "### Launching the application"

echo "This step may take a while if you run it the first time"

docker-compose up -d
