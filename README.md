# Revelations

Revelations is a **Function as a Service** (**FaaS**) platform able to create dynamic APIs based on a programming language and accompaning libraries.

It was initially developed as part of my thesis for my Master Engineer's studies in University of West Attica.

## Requirements

* Modern system that supports Docker and Docker Compose
* Ansible
* 8 GB ram
* 20 GB of free space

## Architecture

This project follows the microservice logic in a Docker Swarm.

Each component uses a different programming language and framework.

This includes:

* **ReactJS** with TypeScript, Tailwind, SCSS, Redux Toolkit and React Query
* **ExpressJS** implemented with TypeScript and Mongoose
* **Gin (Golang)** with the official Docker library and Gin
* **Flask (Python)** with Numpy and Pandas

Moreover it uses a **Mongo** database to store datasets and **Keycloak** to authenticate users.

More on the documentation site.

## Install

Guides on how to install Docker on your Operating System.

If your OS of your choice is missing from here, please refer to the official Wiki of your OS to check if it supports it!

:warning: For Windows 10 and 11, you will need WSL2. Make sure you have build 2024 or newer for Windows 10. You can check on how to install WSL2 [on the official documentation of Microsoft](https://docs.microsoft.com/en-us/windows/wsl/install).

### Debian-based Linux (Ubuntu, Mint, etc)

```bash
echo "Installing docker"
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/debian/gpg |
    sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
echo "Done installing Docker"
```

### Arch-based Linux (Manjaro)

```bash
echo "Installing docker"
sudo pacman -Syu docker docker-compose
sudo systemctl enable --now docker.service

sudo groupadd docker
sudo usermod -aG docker "${USERNAME}"

echo "Successfully installed docker"
```

### Docker Desktop (Windows, MacOS)

:warning: it has not been tested yet if it works on WSL2, but it should

You can install [a desktop GUI if your platform supports it!](https://www.docker.com/products/docker-desktop/)

## How to run

### Development envirnoment

```bash
docker-compose up
```

## Contribute
The code is fully **open source** and everybody can contribute code and put a pull request. If you want to contribute, contact me in Discord ``IakMastro#0344`` or at ``iakmastro@outlook.com.gr``
