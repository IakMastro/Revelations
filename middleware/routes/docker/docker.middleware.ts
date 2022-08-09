import express       from 'express';
import dockerService from './docker.service';
import debug         from 'debug';

const log: debug.IDebugger = debug('app:docker-controller');

/**
 * @class
 * @classdesc The Middleware class for the Docker route
 */
class DockerMiddleware {
  /**
   * @method
   * @access public
   * @desc It checks if the required build fields exists on the request
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateRequiredBuildFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.name || !req.body.path) {
      res.status(400).send('Missing required fields name and path');
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the required run fields exists on the request
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateRequiredRunFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.name || !req.body.tag) {
      res.status(400).send('Missing required fields name and tag');
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the required stop fields exists on the request
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateRequiredStopFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.id) {
      res.status(400).send('Missing required fields id');
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the required file fields exists on the request
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateRequiredFileFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.language || !req.body.code || !req.body.dataset) {
      res.status(400).send("Missing required field(s): language, code and/or dataset");
    } else {
      next();
    }
  }
}

export default new DockerMiddleware();