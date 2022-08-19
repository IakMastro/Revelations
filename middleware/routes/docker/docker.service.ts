import DockerDao        from "./docker.dao";
import {ListDockerDto}  from "./dto/list.docker.dto";
import {RunDockerDto}   from "./dto/run.docker.dto";
import {StopDockerDto}  from "./dto/stop.docker.dto";
import {BuildDockerDto} from "./dto/build.docker.dto";
import {Image}          from "./dto/list.images.dto";
import {FileContentDto} from "./dto/fileContent.dto";
import dockerDao        from "./docker.dao";
import {Dataset}        from "./interface/Dataset";

/**
 * @class
 * @classdesc The Service class for the Docker route
 */
class DockerService {
  /**
   * @method
   * @access public
   * @async
   * @param {BuildDockerDto} resource - The resources need to build a new container
   * @returns {Promise<string>} a message from the Docker API
   */
  async build(resource: BuildDockerDto): Promise<string> {
    return await DockerDao.createContainer(resource);
  }

  /**
   * @method
   * @access public
   * @async
   * @returns {Promise<Image[]>} a list of all the available images
   */
  async images(): Promise<Image[]> {
    return await DockerDao.getImages();
  }

  /**
   * @method
   * @access public
   * @async
   * @param {RunDockerDto} resource - The resources need to run a new container
   * @returns {Promise<string>} the ID of the new container assigned by Docker
   */
  async run(resource: RunDockerDto): Promise<string> {
    return await DockerDao.runContainer(resource);
  }

  /**
   * @method
   * @access public
   * @async
   * @returns {ListDockerDto} returns a list of the currently running containers
   */
  async list(): Promise<ListDockerDto> {
    return await DockerDao.getContainers();
  }

  /**
   * @method
   * @access public
   * @async
   * @param {StopDockerDto} resource - The resources needed to stop a container
   * @returns {Promise<string>} a message from the Docker API
   */
  async stop(resource: StopDockerDto): Promise<string> {
    return await DockerDao.stopContainer(resource);
  }

  /**
   * @method
   * @access public
   * @async
   * @desc This method is preparing the files to be saved to the local file system.
   * @param {string} language
   * @param {string} code
   * @param {Dataset} dataset
   */
  async saveFiles(language: string, code: string, dataset: Dataset) {
    // A list of FileContentDto which saves the file's content and desired path to be saved
    let filesContent: FileContentDto[] = [];

    /*
    A switch case that checks what language the user chose on the web app.
    Dictionary:
      * py => python
    */
    switch (language) {
      case 'py':
        // Dockerfile for a python image
        filesContent.push(
          {
            path: "/files/build/Dockerfile",
            content: `FROM python:3.7-slim
WORKDIR /api

COPY . .
RUN apt-get upgrade && apt-get update &&\\
    apt-get -y install libc-dev build-essential &&\\
    pip install -r requirements.txt

EXPOSE 8000
CMD ["uvicorn", "--reload", "--host", "0.0.0.0", "app:app"]
`
          }
        );

        // Python code
        filesContent.push(
          {
            path: "/files/build/app.py",
            content: `from pymongo import MongoClient
from fastapi import FastAPI
from functools import lru_cache

import json
import numpy as np
import pandas as pd

client = MongoClient("mongodb://${process.env.MONGO_URI}/?authSource=admin")
datasets = client.revelations.datasets
dataset = datasets.find_one({"name": "${dataset.name}"})
dataset = pd.DataFrame(json.dumps(dataset['data']))

app = FastAPI()

# User's endpoints should start from here
`.concat(code).concat("\n")
          }
        );

        // Requirements to run this.
        // If there will be an update on the future, some requirements could be added extra by the end user.
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

    // Writes the content to the file system
    dockerDao.writeFiles(filesContent);
  }
}

export default new DockerService();