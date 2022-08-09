import express       from "express";
import dockerService from "./docker.service";
import debug         from 'debug';

const log: debug.IDebugger = debug('app:docker-controller');

/**
 * @class
 * @classdesc The Controller class for the Docker route
 */
class DockerController {
  /**
   * @method
   * @async
   * @access public
   * @desc It lists the containers that are currently running
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async listContainers(req: express.Request, res: express.Response) {
    let containers = await dockerService.list();
    res.status(200).send(containers);
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It lists the images that are built on the Docker
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async listImages(req: express.Request, res: express.Response) {
    let images = await dockerService.images();
    res.status(200).send(images);
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It runs an image based on a tag
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async runContainer(req: express.Request, res: express.Response) {
    let id = await dockerService.run(req.body);
    res.status(200).send(id);
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It builds a new image
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async build(req: express.Request, res: express.Response) {
    let message = await dockerService.build(req.body);
    res.status(200).send(message);
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It stops a running container
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async stop(req: express.Request, res: express.Response) {
    let message = await dockerService.stop(req.body);
    res.status(200).send(message);
  }

  /**
   * @method
   * @async
   * @access public
   * @desc It saves files to the local file system that is mounted by this API and the Docker API
   * @param {express.Request} req
   * @param {express.Response} res
   */
  async saveFiles(req: express.Request, res: express.Response) {
    await dockerService.saveFiles(req.body.language, req.body.code, req.body.dataset);
    res.status(200).send("Files saved");
  }
}

export default new DockerController();