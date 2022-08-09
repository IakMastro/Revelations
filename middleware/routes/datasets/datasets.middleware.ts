import express         from 'express';
import datasetsService from "./datasets.service";

/**
 * @class
 * @classdesc The Middleware class for the Datasets route
 */
class DatasetsMiddleware {
  /**
   * @method
   * @access public
   * @desc It checks if the required fields fo name, path and description exist on the request
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateRequiredNamePathAndDescriptionFieldsExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.name || !req.body.description || !req.body.path) {
      res.status(400).send('Name, path and description are required');
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the dataset name doesn't already exists
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateDatasetDoesNotNameExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const dataset = await datasetsService.readByName(req.body.name ? req.body.name : req.params.name);
    if (dataset) {
      res.status(400).send('Dataset with this name already exists');
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the dataset name does exists
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateDatasetNameExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const dataset = await datasetsService.readByName(req.body.name ? req.body.name : req.params.name);
    if (!dataset) {
      res.status(400).send("Dataset with this name doesn't exist");
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the dataset ID exists
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
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