import DockerDao        from "./docker.dao";
import {ListDockerDto}  from "./dto/list.docker.dto";
import {RunDockerDto}   from "./dto/run.docker.dto";
import {StopDockerDto}  from "./dto/stop.docker.dto";
import {BuildDockerDto} from "./dto/build.docker.dto";
import {Image}          from "./dto/list.images.dto";
import {FileContentDto} from "./dto/fileContent.dto";
import dockerDao        from "./docker.dao";
import {Dataset}        from "./interface/Dataset";

class DockerService {
  async build(resource: BuildDockerDto): Promise<string> {
    return await DockerDao.createContainer(resource);
  }

  async images(): Promise<Image[]> {
    return await DockerDao.getImages();
  }

  async run(resource: RunDockerDto): Promise<string> {
    return await DockerDao.runContainer(resource);
  }

  async list(): Promise<ListDockerDto> {
    return await DockerDao.getContainers();
  }

  async stop(resource: StopDockerDto): Promise<string> {
    return await DockerDao.stopContainer(resource);
  }

  async saveFiles(language: string, code: string, dataset: Dataset) {
    let filesContent: FileContentDto[] = [];
    switch (language) {
      case 'py':
        filesContent.push(
          {
            path: "/files/build/Dockerfile",
            content: `FROM python:3.7-slim
WORKDIR /api

COPY . .
RUN apt-get upgrade && apt-get update &&\\
    apt-get -y install libc-dev build-essential &&\\
    pip install -r requirements.txt

EXPOSE 8080
CMD ["uvicorn", "app:app"]
`
          }
        );

        filesContent.push(
          {
            path: "/files/build/app.py",
            content: `from pymongo import MongoClient
from fastapi import FastAPI
from functools import lru_cache

import numpy as np
import pandas as pd

client = MongoClient("mongodb://${process.env.MONGO_URI}/?authSource=admin")
datasets = client.revelations.datasets
dataset = datasets.find_one({"dataset": "${dataset.name}"})

app = FastAPI()

# User's endpoints should start from here
`.concat(code)
          }
        );

        filesContent.push(
          {
            path: "/files/build/requirements.txt",
            content: `
fastapi==0.79.0
numpy==1.21.6
pandas==1.3.5
pymongo==4.2.0
uvicorn`
          }
        );
    }

    dockerDao.writeFiles(filesContent);
  }
}

export default new DockerService();