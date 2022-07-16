import express         from 'express';
import datasetsService from "./datasets.service";

class DatasetsMiddleware {
  async validateRequiredNamePathAndDescriptionFieldsExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.name || !req.body.description || !req.body.path) {
      res.status(400).send('Name, path and description are required');
    } else {
      next();
    }
  }

  async validateDatasetDoesNotNameExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const dataset = await datasetsService.readByName(req.body.name ? req.body.name : req.params.name);
    if (dataset) {
      res.status(400).send('Dataset with this name already exists');
    } else {
      next();
    }
  }

  async validateDatasetNameExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const dataset = await datasetsService.readByName(req.body.name ? req.body.name : req.params.name);
    if (!dataset) {
      res.status(400).send("Dataset with this name doesn't exist");
    } else {
      next();
    }
  }

  async validateDatasetIdExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const dataset = await datasetsService.readById(req.params.id);
    if (!dataset) {
      res.status(400).send('Dataset with this id doesn\'t exist');
    } else {
      next();
    }
  }
}

export default new DatasetsMiddleware();