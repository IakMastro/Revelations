import express       from 'express';
import dockerService from './docker.service';
import debug         from 'debug';

const log: debug.IDebugger = debug('app:docker-controller');

class DockerMiddleware {
  async validateRequiredBuildFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.name || !req.body.path) {
      res.status(400).send('Missing required fields name and path');
    } else {
      next();
    }
  }

  async validateRequiredRunFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.name || !req.body.tag) {
      res.status(400).send('Missing required fields name and tag');
    } else {
      next();
    }
  }

  async validateRequiredStopFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.id) {
      res.status(400).send('Missing required fields id');
    } else {
      next();
    }
  }
}

export default new DockerMiddleware();