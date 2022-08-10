---
sidebar_position: 1
---

# Installation Guide

This is a simple installation guide on how to install the Revelations platform locally on your computer!

## Requirements

* Modern system that supports Docker and Docker Compose
* Ansible
* 8 GB of ram
* 20 GB of free space minimum

## Docker - Installation

Guides on how to install Docker on your Operating System.

:::tip My OS is missing

If your OS is missing from here, plesase refer to the official wiki of your distro of choice.

:::

:::danger What about Windows? How do I run it from there?

For Windows 10 and 11, you will need WSL2. Make sure you have build 2004 or newer for Windows 10. You can check on how to install WSL2 [on the official documentation of Microsoft](https://docs.microsoft.com/en-us/windows/wsl/install). Older versions of Windows do not support WSL, so it's impossible to run Docker.

:::

### Debian-based Linux (Ubuntu, Mint)

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

### Docker Destop (Windows, MacOS)

:::danger NOT TESTED YET

It has not been tested if the platform works on WSL2, but it should!

:::

You can install [a desktop GUI if your platform supports it!](https://www.docker.com/products/docker-desktop/)

## How to run

### Development Environment

```bash
docker-compose up
```
