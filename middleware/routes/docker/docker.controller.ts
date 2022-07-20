import express       from "express";
import dockerService from "./docker.service";
import debug         from 'debug';

const log: debug.IDebugger = debug('app:docker-controller');

class DockerController {
  async listContainers(req: express.Request, res: express.Response) {
    let containers = await dockerService.list();
    res.status(200).send(containers);
  }

  async listImages(req: express.Request, res: express.Response) {
    let images = await dockerService.images();
    res.status(200).send(images);
  }

  async runContainer(req: express.Request, res: express.Response) {
    let id = await dockerService.run(req.body);
    res.status(200).send(id);
  }

  async build(req: express.Request, res: express.Response) {
    let message = await dockerService.build(req.body);
    res.status(200).send(message);
  }

  async stop(req: express.Request, res: express.Response) {
    let message = await dockerService.stop(req.body);
    res.status(200).send(message);
  }
}

export default new DockerController();